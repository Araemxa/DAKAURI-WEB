const express = require('express');
const router = express.Router();
const { query } = require('../config/db');

// GET semua statistik (aktif)
router.get('/', async (req, res) => {
  try {
    const { year } = req.query;
    let sql = 'SELECT * FROM statistik WHERE is_active = TRUE';
    const params = [];

    if (year) {
      params.push(year);
      sql += ` AND year = $${params.length}`;
    }

    sql += ' ORDER BY sort_order';
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET statistik by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM statistik WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Data tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create statistik
router.post('/', async (req, res) => {
  try {
    const { title, value, icon, description, year, sort_order, is_active, created_by } = req.body;
    const result = await query(
      'INSERT INTO statistik (title, value, icon, description, year, sort_order, is_active, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [title, value, icon, description, year, sort_order || 0, is_active !== false, created_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update statistik
router.put('/:id', async (req, res) => {
  try {
    const { title, value, icon, description, year, sort_order, is_active } = req.body;
    const result = await query(
      'UPDATE statistik SET title = COALESCE($1, title), value = COALESCE($2, value), icon = COALESCE($3, icon), description = COALESCE($4, description), year = COALESCE($5, year), sort_order = COALESCE($6, sort_order), is_active = COALESCE($7, is_active) WHERE id = $8 RETURNING *',
      [title, value, icon, description, year, sort_order, is_active, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Data tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE statistik
router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM statistik WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Data tidak ditemukan' });
    res.json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
