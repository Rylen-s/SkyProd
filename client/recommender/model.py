# recommender.py
from fastapi import FastAPI, Depends
from supabase import create_client
from pydantic import BaseModel

app = FastAPI()
supabase = create_client(
  os.getenv("SUPABASE_URL"),
  os.getenv("SUPABASE_SERVICE_ROLE_KEY")
)

class Quest(BaseModel):
  description: str
  xp: int


@app.post("/recommend/{user_id}", response_model=list[Quest])


def recommend(user_id: str):
  # 1) fetch their activities
  data = supabase.from_("activities").select("*").eq("user_id", user_id).execute().data
  # 2) run your model on that `data` to produce a list of strings
  recs = my_model.recommend(data)
  # 3) insert them into quests
  inserted = supabase.from_("quests").insert(
    [{"user_id": user_id, "description": desc} for desc in recs]
  ).execute().data
  return inserted
