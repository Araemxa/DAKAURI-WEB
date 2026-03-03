const express = require('express');
const router = express.Router();
const { query } = require('../config/db');

// GET semua profil (aktif)
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM profil_organisasi WHERE is_active = TRUE ORDER BY type, sort_order');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET profil by type
router.get('/type/:type', async (req, res) => {
  try {
    const result = await query('SELECT * FROM profil_organisasi WHERE type = $1 AND is_active = TRUE ORDER BY sort_order', [req.params.type]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET profil by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM profil_organisasi WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Data tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create profil
router.post('/', async (req, res) => {
  try {
    const { title, content, type, image, sort_order, is_active, created_by } = req.body;
    const result = await query(
      'INSERT INTO profil_organisasi (title, content, type, image, sort_order, is_active, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, content, type, image, sort_order || 0, is_active !== false, created_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update profil
router.put('/:id', async (req, res) => {
  try {
    const { title, content, type, image, sort_order, is_active } = req.body;
    const result = await query(
      'UPDATE profil_organisasi SET title = COALESCE($1, title), content = COALESCE($2, content), type = COALESCE($3, type), image = COALESCE($4, image), sort_order = COALESCE($5, sort_order), is_active = COALESCE($6, is_active) WHERE id = $7 RETURNING *',
      [title, content, type, image, sort_order, is_active, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Data tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE profil
router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM profil_organisasi WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Data tidak ditemukan' });
    res.json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
