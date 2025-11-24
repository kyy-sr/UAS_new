const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/database');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username dan password harus diisi' });
    }

    // Check if username already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Username sudah digunakan' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await pool.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    res.json({
      success: true,
      message: 'Akun berhasil dibuat!',
      user: {
        id: result.insertId,
        username: username
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Gagal membuat akun' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username dan password harus diisi' });
    }

    // Check user
    const [users] = await pool.execute(
      'SELECT id, username, password FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Username atau password salah' });
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Username atau password salah' });
    }

    res.json({
      success: true,
      message: 'Login berhasil',
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat login' });
  }
});

module.exports = router;

