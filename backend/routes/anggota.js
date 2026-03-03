const express = require('express');
const router = express.Router();
const { query } = require('../config/db');

// GET semua anggota (aktif)
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM anggota WHERE is_active = TRUE ORDER BY sort_order, nama');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET semua anggota (termasuk non-aktif, untuk admin)
router.get('/all', async (req, res) => {
  try {
    const result = await query('SELECT * FROM anggota ORDER BY sort_order, nama');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET anggota by jabatan
router.get('/jabatan/:jabatan', async (req, res) => {
  try {
    const result = await query('SELECT * FROM anggota WHERE jabatan = $1 AND is_active = TRUE ORDER BY sort_order', [req.params.jabatan]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET anggota by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM anggota WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Anggota tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create anggota
router.post('/', async (req, res) => {
  try {
    const { nama, jabatan, divisi, foto, sort_order, is_active } = req.body;
    const result = await query(
      'INSERT INTO anggota (nama, jabatan, divisi, foto, sort_order, is_active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nama, jabatan, divisi || null, foto || null, sort_order || 0, is_active !== false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update anggota
router.put('/:id', async (req, res) => {
  try {
    const { nama, jabatan, divisi, foto, sort_order, is_active } = req.body;
    const result = await query(
      `UPDATE anggota SET 
        nama = COALESCE($1, nama), 
        jabatan = COALESCE($2, jabatan), 
        divisi = COALESCE($3, divisi), 
        foto = COALESCE($4, foto), 
        sort_order = COALESCE($5, sort_order), 
        is_active = COALESCE($6, is_active),
        updated_at = CURRENT_TIMESTAMP 
      WHERE id = $7 RETURNING *`,
      [nama, jabatan, divisi, foto, sort_order, is_active, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Anggota tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE anggota
router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM anggota WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Anggota tidak ditemukan' });
    res.json({ message: 'Anggota berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
