const express = require('express');
const router = express.Router();
const { query } = require('../config/db');

// GET semua user
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT id, firebase_uid, email, display_name, role, phone, is_active, created_at FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET user by Firebase UID
router.get('/firebase/:uid', async (req, res) => {
  try {
    const result = await query('SELECT * FROM users WHERE firebase_uid = $1', [req.params.uid]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET user by email
router.get('/email/:email', async (req, res) => {
  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [req.params.email]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create user
router.post('/', async (req, res) => {
  try {
    const { firebase_uid, email, display_name, role, phone, address, photo_url } = req.body;
    const result = await query(
      'INSERT INTO users (firebase_uid, email, display_name, role, phone, address, photo_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [firebase_uid, email, display_name, role || 'pengunjung', phone, address, photo_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'User sudah terdaftar' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT update user
router.put('/:id', async (req, res) => {
  try {
    const { display_name, role, phone, address, photo_url, is_active } = req.body;
    const result = await query(
      'UPDATE users SET display_name = COALESCE($1, display_name), role = COALESCE($2, role), phone = COALESCE($3, phone), address = COALESCE($4, address), photo_url = COALESCE($5, photo_url), is_active = COALESCE($6, is_active) WHERE id = $7 RETURNING *',
      [display_name, role, phone, address, photo_url, is_active, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
