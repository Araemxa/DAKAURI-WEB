const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging (dev)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/profil', require('./routes/profil'));
app.use('/api/program-kerja', require('./routes/programKerja'));
app.use('/api/statistik', require('./routes/statistik'));
app.use('/api/merchandise', require('./routes/merchandise'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/anggota', require('./routes/anggota'));

// Dashboard summary endpoint
const { query } = require('./config/db');
app.get('/api/dashboard', async (req, res) => {
  try {
    const result = await query('SELECT * FROM dashboard_summary');
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Terjadi kesalahan server' });
});

app.listen(PORT, () => {
  console.log(`🚀 DAKAURI Backend running on http://localhost:${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
});
