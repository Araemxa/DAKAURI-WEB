const express = require('express');
const router = express.Router();
const { query } = require('../config/db');

// GET semua artikel (published, dengan filter)
router.get('/', async (req, res) => {
  try {
    const { category, all } = req.query;
    let sql = 'SELECT * FROM articles';
    const params = [];

    // Jika admin request semua (termasuk draft)
    if (all === 'true') {
      sql += ' WHERE 1=1';
    } else {
      sql += ' WHERE is_published = TRUE';
    }

    if (category) {
      params.push(category);
      sql += ` AND category = $${params.length}`;
    }

    sql += ' ORDER BY published_at DESC NULLS LAST, created_at DESC';
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET artikel by ID (juga update views)
router.get('/:id', async (req, res) => {
  try {
    const result = await query(
      'UPDATE articles SET views = views + 1 WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Artikel tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create artikel
router.post('/', async (req, res) => {
  try {
    const { title, excerpt, content, category, author, image, read_time, is_published, created_by } = req.body;
    const published_at = is_published ? new Date() : null;
    const result = await query(
      'INSERT INTO articles (title, excerpt, content, category, author, image, read_time, is_published, published_at, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [title, excerpt, content, category, author, image, read_time || 5, is_published || false, published_at, created_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update artikel
router.put('/:id', async (req, res) => {
  try {
    const { title, excerpt, content, category, author, image, read_time, is_published } = req.body;

    // Jika baru dipublish, set published_at
    let published_at = undefined;
    if (is_published) {
      const existing = await query('SELECT is_published FROM articles WHERE id = $1', [req.params.id]);
      if (existing.rows.length > 0 && !existing.rows[0].is_published) {
        published_at = new Date();
      }
    }

    const result = await query(
      `UPDATE articles SET title = COALESCE($1, title), excerpt = COALESCE($2, excerpt), content = COALESCE($3, content), category = COALESCE($4, category), author = COALESCE($5, author), image = COALESCE($6, image), read_time = COALESCE($7, read_time), is_published = COALESCE($8, is_published)${published_at ? ', published_at = $10' : ''} WHERE id = $9 RETURNING *`,
      published_at
        ? [title, excerpt, content, category, author, image, read_time, is_published, req.params.id, published_at]
        : [title, excerpt, content, category, author, image, read_time, is_published, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Artikel tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE artikel
router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM articles WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Artikel tidak ditemukan' });
    res.json({ message: 'Artikel berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
