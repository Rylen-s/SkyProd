const express = require('express');
const pool = require('../db');
const router = express.Router();

// GET /api/activities
router.get('/', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM activities WHERE uid=$1 ORDER BY created_at DESC',
    [req.uid]
  );
  res.json(rows);
});

// POST /api/activities
router.post('/', async (req, res) => {
  const { description } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO activities(uid, description) VALUES($1,$2) RETURNING *',
    [req.uid, description]
  );
  res.status(201).json(rows[0]);
});

module.exports = router;
