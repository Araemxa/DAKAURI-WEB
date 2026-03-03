import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiUserPlus, FiCalendar, FiBarChart2, FiShoppingBag, 
  FiEdit3, FiLogOut, FiMenu, FiX, FiArrowLeft, FiActivity
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import logoImg from '../../assets/images/logo.png';
import '../../pages/admin/Dashboard.css';

const sidebarLinks = [
  { path: '/admin', label: 'Dashboard', icon: FiHome },
  { path: '/admin/profil', label: 'Profil Organisasi', icon: FiUsers },
  { path: '/admin/anggota', label: 'Anggota', icon: FiUserPlus },
  { path: '/admin/program-kerja', label: 'Program Kerja', icon: FiCalendar },
  { path: '/admin/statistik', label: 'Statistik', icon: FiBarChart2 },
  { path: '/admin/merchandise', label: 'Merchandise', icon: FiShoppingBag },
  { path: '/admin/blog', label: 'Blog & Artikel', icon: FiEdit3 },
];

const AdminLayout = ({ children, title = 'Dashboard Admin' }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <img src={logoImg} alt="DAKAURI" />
            {sidebarOpen && <span>DAKAURI</span>}
          </Link>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {sidebarLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              <link.icon className="sidebar-link-icon" />
              {sidebarOpen && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-link">
            <FiArrowLeft className="sidebar-link-icon" />
            {sidebarOpen && <span>Kembali ke Website</span>}
          </Link>
          <button onClick={handleLogout} className="sidebar-link logout-link">
            <FiLogOut className="sidebar-link-icon" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        {/* Top bar */}
        <header className="admin-topbar">
          <button className="mobile-sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </button>
          <div className="topbar-title">
            <h1>{title}</h1>
            <p>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="topbar-user">
            <FiActivity />
            <span>{user?.email?.split('@')[0] || 'Admin'}</span>
          </div>
        </header>

        {/* Page content */}
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
