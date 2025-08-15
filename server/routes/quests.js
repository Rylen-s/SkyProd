// server/routes/tasks.js
import express from 'express';
import supabase from '../db.js';
const router  = express.Router();

// GET /api/quests
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('quests')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('❌ Supabase get error:', error);
      // forward to your error handler
      return next(new Error(error.message));
    }

    return res.json(data);
  } catch (err) {
    console.error('❌ GET error in /api/quests:', err);
    return next(err);
  }
});

// POST /api/quests
router.post('/', async (req, res, next) => {
  try {
    const { description, xp, metadata } = req.body;
    if (!description || !xp) {
      return res.status(400).json({ error: '❌ Missing description or xp' });
    }
    const { data, error } = await supabase
      .from('quests')
      .insert([{ description, xp, uid: req.uid , completed: false}])
      .select();

    if (error) {
      console.error('❌ Supabase insert error:', error);
      throw error;
    }

    return res.status(201).json(data[0]);
  } catch (err) {
    console.error('❌ Error in POST /api/quests:', err);
    next(err);
  }
});

// PATCH /api/quests/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('DELETE /api/quests/:id', { id, uid: req.uid });

    // IMPORTANT: match same user column you insert on POST (you used `uid`)
    const { error } = await supabase
      .from('quests')
      .delete()
      .match({ id, uid: req.uid });   // if your table is uuid id, `id` should be that uuid

    if (error) {
      console.error('Supabase delete error:', error);
      return next(error);             // will become a 500 with the message
    }

    return res.status(204).end();     // No Content – no body to serialize
  } catch (err) {
    console.error('DELETE handler error:', err);
    next(err);
  }
});

export default router;
