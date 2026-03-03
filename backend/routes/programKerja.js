const express = require('express');
const router = express.Router();
const { query } = require('../config/db');

// GET semua program (aktif, dengan filter)
router.get('/', async (req, res) => {
  try {
    const { category, status } = req.query;
    let sql = 'SELECT * FROM program_kerja WHERE is_active = TRUE';
    const params = [];

    if (category) {
      params.push(category);
      sql += ` AND category = $${params.length}`;
    }
    if (status) {
      params.push(status);
      sql += ` AND status = $${params.length}`;
    }

    sql += ' ORDER BY start_date DESC';
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET program by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM program_kerja WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Program tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create program
router.post('/', async (req, res) => {
  try {
    const { title, description, category, status, start_date, end_date, location, image, participants, is_active, created_by } = req.body;
    const result = await query(
      'INSERT INTO program_kerja (title, description, category, status, start_date, end_date, location, image, participants, is_active, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [title, description, category, status || 'akan-datang', start_date, end_date, location, image, participants || 0, is_active !== false, created_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update program
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, status, start_date, end_date, location, image, participants, is_active } = req.body;
    const result = await query(
      'UPDATE program_kerja SET title = COALESCE($1, title), description = COALESCE($2, description), category = COALESCE($3, category), status = COALESCE($4, status), start_date = COALESCE($5, start_date), end_date = COALESCE($6, end_date), location = COALESCE($7, location), image = COALESCE($8, image), participants = COALESCE($9, participants), is_active = COALESCE($10, is_active) WHERE id = $11 RETURNING *',
      [title, description, category, status, start_date, end_date, location, image, participants, is_active, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Program tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE program
router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM program_kerja WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Program tidak ditemukan' });
    res.json({ message: 'Program berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
