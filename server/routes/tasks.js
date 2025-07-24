// server/routes/tasks.js
const express = require('express');
const pool    = require('../db');
const router  = express.Router();

// GET /api/tasks
router.get('/', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM tasks WHERE uid = $1 ORDER BY created_at DESC',
    [req.uid]
  );
  res.json(rows);
});

// POST /api/tasks
router.post('/', async (req, res) => {
  const { title } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO tasks(uid, title) VALUES($1,$2) RETURNING *',
    [req.uid, title]
  );
  res.status(201).json(rows[0]);
});

// PATCH /api/tasks/:id/complete
router.patch('/:id/complete', async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    'UPDATE tasks SET completed = TRUE WHERE id = $1 AND uid = $2 RETURNING *',
    [id, req.uid]
  );
  res.json(rows[0]);
});

module.exports = router;
