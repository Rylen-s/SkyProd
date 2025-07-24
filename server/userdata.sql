-- migrations/001_create_tasks.sql
CREATE TABLE tasks (
  id          SERIAL PRIMARY KEY,
  uid         TEXT    NOT NULL,       -- maps to Firebase UID
  title       TEXT    NOT NULL,
  completed   BOOLEAN DEFAULT FALSE,
  xp          INT     DEFAULT 0,
  created_at  TIMESTAMP DEFAULT now()
);
