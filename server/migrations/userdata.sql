-- migrations/001_create_tasks.sql
CREATE TABLE quests (
  id          SERIAL PRIMARY KEY,
  uid         TEXT    NOT NULL,       -- maps to Firebase UID
  title       TEXT    NOT NULL,       -- What to do
  completed   BOOLEAN DEFAULT FALSE,  -- done or no?
  xp          INT     DEFAULT 0,      -- xp
  created_at  TIMESTAMP DEFAULT now() -- timestamp
);

INSERT INTO quests (uid,title,completed,xp)
VALUES ('firebase_user_1','Complete 15 Pullups', FALSE, 10),
       ('firebase_user_2','Complete 2 LeetCode Problems', FALSE, 15),
       ('firebase_user_3','Get out of Bed', FALSE, 100),
       ('firebase_user_4','Life is Complete', FALSE, 1000);


CREATE TABLE activities (
  id          SERIAL PRIMARY KEY,
  uid         TEXT    NOT NULL,       -- Firebase UID
  description TEXT    NOT NULL,       -- “What I did today…”
  created_at  TIMESTAMP DEFAULT now()
);

INSERT INTO activities (uid, description)
VALUES ('firebase_user_1','I did some chores and about 10 pullups'),
       ('firebase_user_2','I worked on my summer project!'),
       ('firebase_user_3','I just laid in bed today'),
       ('firebase_user_4','I downloaded SkyProd today!');