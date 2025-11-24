const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get all todos for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.query.user_id;

    if (!userId) {
      return res.status(400).json({ error: 'user_id diperlukan' });
    }

    const [todos] = await pool.execute(
      'SELECT * FROM todo WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    // Convert completed boolean
    const formattedTodos = todos.map(todo => ({
      ...todo,
      completed: Boolean(todo.completed),
      done: Boolean(todo.completed)
    }));

    res.json(formattedTodos);
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ error: 'Gagal mengambil todos' });
  }
});

// Create new todo
router.post('/', async (req, res) => {
  try {
    const { title, description, start_date, end_date, user_id } = req.body;

    if (!title || !start_date || !end_date || !user_id) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    const [result] = await pool.execute(
      'INSERT INTO todo (title, description, start_date, end_date, user_id) VALUES (?, ?, ?, ?, ?)',
      [title, description || '', start_date, end_date, user_id]
    );

    const [todos] = await pool.execute(
      'SELECT * FROM todo WHERE id = ?',
      [result.insertId]
    );

    const todo = todos[0];
    todo.completed = Boolean(todo.completed);
    todo.done = Boolean(todo.completed);

    res.json(todo);
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ error: 'Gagal membuat todo' });
  }
});

// Update todo
router.put('/', async (req, res) => {
  try {
    const { id, title, description, start_date, end_date, completed } = req.body;

    if (!id || !title || !start_date || !end_date) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    await pool.execute(
      'UPDATE todo SET title = ?, description = ?, start_date = ?, end_date = ?, completed = ? WHERE id = ?',
      [title, description || '', start_date, end_date, completed ? 1 : 0, id]
    );

    const [todos] = await pool.execute(
      'SELECT * FROM todo WHERE id = ?',
      [id]
    );

    const todo = todos[0];
    todo.completed = Boolean(todo.completed);
    todo.done = Boolean(todo.completed);

    res.json(todo);
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ error: 'Gagal mengupdate todo' });
  }
});

// Delete todo
router.delete('/', async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ error: 'ID diperlukan' });
    }

    await pool.execute('DELETE FROM todo WHERE id = ?', [id]);

    res.json({ success: true, message: 'Todo berhasil dihapus' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ error: 'Gagal menghapus todo' });
  }
});

module.exports = router;

