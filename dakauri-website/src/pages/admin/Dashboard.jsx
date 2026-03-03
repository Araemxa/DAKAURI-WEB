import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiUsers, FiUserPlus, FiFileText, FiBarChart2, FiShoppingBag, 
  FiEdit3, FiBox, FiTrendingUp, FiCalendar, FiDollarSign
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { dashboardService } from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total_users: 0,
    total_products: 0,
    total_articles: 0,
    total_programs: 0,
    total_orders: 0,
    total_revenue: 0
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await dashboardService.getSummary();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };
    fetchDashboard();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.total_users, icon: FiUsers, color: '#2D5A27', bg: '#f0fdf4' },
    { label: 'Program Kerja', value: stats.total_programs, icon: FiCalendar, color: '#0369a1', bg: '#f0f9ff' },
    { label: 'Produk', value: stats.total_products, icon: FiBox, color: '#9333ea', bg: '#faf5ff' },
    { label: 'Artikel', value: stats.total_articles, icon: FiFileText, color: '#ea580c', bg: '#fff7ed' },
    { label: 'Pesanan', value: stats.total_orders, icon: FiShoppingBag, color: '#0891b2', bg: '#ecfeff' },
    { label: 'Revenue', value: `Rp ${Number(stats.total_revenue || 0).toLocaleString('id-ID')}`, icon: FiDollarSign, color: '#16a34a', bg: '#f0fdf4' },
  ];

  const contentItems = [
    { title: 'Profil Organisasi', desc: 'Kelola visi, misi, sejarah, dan struktur organisasi', path: '/admin/profil', icon: FiUsers, color: '#2D5A27' },
    { title: 'Anggota', desc: 'Kelola data anggota, pengurus, dan koordinator', path: '/admin/anggota', icon: FiUserPlus, color: '#059669' },
    { title: 'Program Kerja', desc: 'CRUD kegiatan konservasi, edukasi, ekspedisi', path: '/admin/program-kerja', icon: FiCalendar, color: '#0369a1' },
    { title: 'Statistik', desc: 'Atur data statistik yang ditampilkan di website', path: '/admin/statistik', icon: FiBarChart2, color: '#7c3aed' },
    { title: 'Merchandise', desc: 'Kelola produk, harga, stok, dan kategori', path: '/admin/merchandise', icon: FiShoppingBag, color: '#ea580c' },
    { title: 'Blog & Artikel', desc: 'Tulis, edit, dan publish artikel blog', path: '/admin/blog', icon: FiEdit3, color: '#0891b2' },
  ];

  return (
    <AdminLayout title="Dashboard Admin">
      {/* Welcome */}
      <motion.div
        className="admin-welcome"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2>Selamat Datang, {user?.email?.split('@')[0] || 'Admin'}! 👋</h2>
        <p>Kelola semua konten website DAKAURI dari sini. Pilih menu untuk memulai.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            className="admin-stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            style={{ '--stat-color': stat.color, '--stat-bg': stat.bg }}
          >
            <div className="admin-stat-icon">
              <stat.icon />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{stat.value}</span>
              <span className="admin-stat-label">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content Management Grid */}
      <div className="admin-section-header">
        <FiTrendingUp />
        <h3>Kelola Konten Website</h3>
      </div>
      <div className="admin-content-grid">
        {contentItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
          >
            <Link to={item.path} className="admin-content-card">
              <div className="admin-content-card-icon" style={{ background: item.color }}>
                <item.icon />
              </div>
              <div className="admin-content-card-info">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
              <div className="admin-content-card-arrow">→</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
