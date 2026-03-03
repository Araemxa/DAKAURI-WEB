const express = require('express');
const router = express.Router();
const { query } = require('../config/db');

// GET semua produk (aktif, dengan filter)
router.get('/', async (req, res) => {
  try {
    const { category, min_price, max_price, sort } = req.query;
    let sql = 'SELECT * FROM products WHERE is_active = TRUE';
    const params = [];

    if (category) {
      params.push(category);
      sql += ` AND category = $${params.length}`;
    }
    if (min_price) {
      params.push(min_price);
      sql += ` AND price >= $${params.length}`;
    }
    if (max_price) {
      params.push(max_price);
      sql += ` AND price <= $${params.length}`;
    }

    switch (sort) {
      case 'price_asc': sql += ' ORDER BY price ASC'; break;
      case 'price_desc': sql += ' ORDER BY price DESC'; break;
      case 'newest': sql += ' ORDER BY created_at DESC'; break;
      case 'name': sql += ' ORDER BY name ASC'; break;
      default: sql += ' ORDER BY created_at DESC';
    }

    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET produk by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produk tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create produk
router.post('/', async (req, res) => {
  try {
    const { name, description, category, price, stock, image, images, weight, is_active, created_by } = req.body;
    const result = await query(
      'INSERT INTO products (name, description, category, price, stock, image, images, weight, is_active, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [name, description, category, price, stock || 0, image, images, weight, is_active !== false, created_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update produk
router.put('/:id', async (req, res) => {
  try {
    const { name, description, category, price, stock, image, images, weight, is_active } = req.body;
    const result = await query(
      'UPDATE products SET name = COALESCE($1, name), description = COALESCE($2, description), category = COALESCE($3, category), price = COALESCE($4, price), stock = COALESCE($5, stock), image = COALESCE($6, image), images = COALESCE($7, images), weight = COALESCE($8, weight), is_active = COALESCE($9, is_active) WHERE id = $10 RETURNING *',
      [name, description, category, price, stock, image, images, weight, is_active, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produk tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH update stock
router.patch('/:id/stock', async (req, res) => {
  try {
    const { quantity } = req.body;
    const result = await query(
      'UPDATE products SET stock = stock + $1 WHERE id = $2 RETURNING *',
      [quantity, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produk tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE produk
router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM products WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produk tidak ditemukan' });
    res.json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
