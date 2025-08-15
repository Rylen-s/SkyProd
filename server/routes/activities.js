import express from 'express';
const router = express.Router();
import supabase from '../db.js';

// GET /api/activities
  console.log('Got to activties.js route');

router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('❌ Supabase query error:', error);
      // forward to your error handler
      return next(new Error(error.message));
    }

    return res.json(data);
  } catch (err) {
    console.error('🔥 Unexpected error in /api/activities:', err);
    return next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: 'Missing description' });
    }
    const { data, error } = await supabase
      .from('activities')
      .insert([{ description, uid: req.uid }])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    return res.status(201).json(data[0]);
  } catch (err) {
    console.error('Error in POST /api/activities:', err);
    next(err);
  }
});

export default router;
