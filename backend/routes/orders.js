const express = require('express');
const router = express.Router();
const { query } = require('../config/db');

// GET semua orders
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let sql = 'SELECT * FROM orders';
    const params = [];

    if (status) {
      params.push(status);
      sql += ` WHERE status = $${params.length}`;
    }

    sql += ' ORDER BY created_at DESC';
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET orders by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const result = await query(
      'SELECT o.*, json_agg(json_build_object(\'id\', oi.id, \'product_name\', oi.product_name, \'product_price\', oi.product_price, \'quantity\', oi.quantity, \'subtotal\', oi.subtotal)) AS items FROM orders o LEFT JOIN order_items oi ON o.id = oi.order_id WHERE o.user_id = $1 GROUP BY o.id ORDER BY o.created_at DESC',
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET order by ID
router.get('/:id', async (req, res) => {
  try {
    const orderResult = await query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
    if (orderResult.rows.length === 0) return res.status(404).json({ error: 'Order tidak ditemukan' });

    const itemsResult = await query('SELECT * FROM order_items WHERE order_id = $1', [req.params.id]);

    res.json({
      ...orderResult.rows[0],
      items: itemsResult.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create order
router.post('/', async (req, res) => {
  const client = await require('../config/db').pool.connect();
  try {
    await client.query('BEGIN');

    const { user_id, customer_name, customer_email, customer_phone, shipping_address, items, payment_method, notes } = req.body;

    // Generate order number
    const orderNumber = `DKR-${Date.now().toString(36).toUpperCase()}`;

    // Hitung total
    let totalAmount = 0;
    for (const item of items) {
      totalAmount += item.price * item.quantity;

      // Kurangi stock
      const stockResult = await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING *',
        [item.quantity, item.product_id]
      );
      if (stockResult.rows.length === 0) {
        throw new Error(`Stok tidak mencukupi untuk produk: ${item.name}`);
      }
    }

    // Insert order
    const orderResult = await client.query(
      'INSERT INTO orders (order_number, user_id, customer_name, customer_email, customer_phone, shipping_address, total_amount, payment_method, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [orderNumber, user_id, customer_name, customer_email, customer_phone, shipping_address, totalAmount, payment_method, notes]
    );

    const orderId = orderResult.rows[0].id;

    // Insert order items
    for (const item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal) VALUES ($1, $2, $3, $4, $5, $6)',
        [orderId, item.product_id, item.name, item.price, item.quantity, item.price * item.quantity]
      );
    }

    await client.query('COMMIT');

    res.status(201).json({
      ...orderResult.rows[0],
      items: items
    });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// PATCH update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const result = await query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Order tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST process payment
router.post('/payment/process', async (req, res) => {
  try {
    const { order_id, payment_method } = req.body;
    const result = await query(
      'UPDATE orders SET payment_status = $1, payment_method = $2, status = $3 WHERE id = $4 RETURNING *',
      ['paid', payment_method, 'confirmed', order_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Order tidak ditemukan' });
    res.json({ message: 'Pembayaran berhasil', order: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
