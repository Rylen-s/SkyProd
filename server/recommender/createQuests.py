import os
import json
from typing import List
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Query, APIRouter
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from supabase import create_client, Client
import httpx

load_dotenv()
app = FastAPI(title="My Awesome App")
router = APIRouter(prefix="/quests", tags=["Quests"])
app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Welcome to the API!"}
try:
  SUPABASE_URL = os.environ.get("SUPABASE_URL")
  SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
  OLLAMA_HOST = os.environ.get("OLLAMA_HOST", "http://localhost:11434")
  MODEL = os.environ.get("MODEL", "llama3.1:8b")
except Exception as e:
  print(f"An unexpected error occurred: {e}")


if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    raise RuntimeError("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")

try:
  supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  app = FastAPI(title="Quest Recommender")
except Exception as e:
  print(f"An unexpected error occurred at creating client: {e}")

class QuestIn(BaseModel):
    title: str
    description: str
    xp: int

class RecommendResponse(BaseModel):
    generated: List[QuestIn]

PROMPT_TMPL = """You are a coach generating short, actionable quests for a college student.

Recent activities (most recent first):
{activities}

Create 3-5 quests that gradually increase difficulty. Return ONLY strict JSON with this schema:
[
  {{"title": "string", "description": "string", "xp": 50}},
  ...
]

Rules:
- xp must be an integer (e.g., 25/50/75/100)
- titles are short
- descriptions are specific and encouraging
- no extra commentary, just valid JSON
"""

async def call_ollama(prompt: str) -> List[dict]:
    """
    Calls Ollama's /api/generate for a single turn completion and returns parsed JSON list.
    """
    try:
      url = f"{OLLAMA_HOST}/api/generate"
      payload = {
          "model": MODEL,
          "prompt": prompt,
          "stream": False,
          "options": { "temperature": 0.6 }
      }
      async with httpx.AsyncClient(timeout=60) as client:
          r = await client.post(url, json=payload)
          r.raise_for_status()
          txt = r.json().get("response", "").strip()
          # Try to locate a JSON array in the response
          try:
              # If the model adds code fences, strip them
              if "```" in txt:
                  txt = txt.split("```")[1]
                  # could be "json\n[...]"
                  if "\n" in txt:
                      txt = "\n".join(txt.split("\n")[1:])
              data = json.loads(txt)
              if not isinstance(data, list):
                  raise ValueError("Model did not return a JSON array")
              return data
          except Exception as e:
              raise HTTPException(status_code=422, detail=f"Bad model JSON: {e}. Raw: {txt[:200]}")
    except Exception as e:    
      print(f"An unexpected error occurred in hosting ollama: {e}")

def format_activities(rows: List[dict]) -> str:
    return "\n".join([f"- {r['created_at']}: {r['description']}" for r in rows])

@app.get("/health")
async def health():
    return {"ok": True}



@app.post("/recommend", response_model=RecommendResponse)
async def recommend(uid: str = Query(..., description="User id to recommend for")):
    # 1) Fetch recent activities for this user
    res = supabase.table("activities") \
        .select("description, created_at") \
        .eq("uid", uid) \
        .order("created_at", desc=True) \
        .limit(15) \
        .execute()

    if res.error:
        raise HTTPException(status_code=500, detail=f"Supabase fetch error: {res.error.message}")

    act_text = format_activities(res.data or [])
    prompt = PROMPT_TMPL.format(activities=act_text or "(no recent activities)")

    # 2) Generate quests with Ollama
    quests = await call_ollama(prompt)

    # Validate & coerce
    cleaned: List[QuestIn] = []
    for q in quests:
        try:
            title = str(q.get("title", "")).strip()
            description = str(q.get("description", "")).strip()
            xp = int(q.get("xp", 50))
            if not title or not description:
                continue
            cleaned.append(QuestIn(title=title, description=description, xp=xp))
        except Exception:
            continue

    # 3) Insert into quests table
    if cleaned:
        payload = [{"uid": uid, "title": q.title, "description": q.description, "xp": q.xp, "completed": False}
                   for q in cleaned]
        ins = supabase.table("quests").insert(payload).execute()
        if ins.error:
            raise HTTPException(status_code=500, detail=f"Supabase insert error: {ins.error.message}")

    return JSONResponse(status_code=201, content={"generated": [q.model_dump() for q in cleaned]})
