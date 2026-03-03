import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoadingScreen from './components/common/LoadingScreen';

// Auth Components
import ProtectedRoute from './components/auth/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import Profil from './pages/public/Profil';
import ProgramKerja from './pages/public/ProgramKerja';
import Statistik from './pages/public/Statistik';
import Merchandise from './pages/public/Merchandise';
import Blog from './pages/public/Blog';
import Cart from './pages/public/Cart';
import Login from './pages/public/Login';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ManageProfil from './pages/admin/ManageProfil';
import ManageProgramKerja from './pages/admin/ManageProgramKerja';
import ManageMerchandise from './pages/admin/ManageMerchandise';
import ManageStatistik from './pages/admin/ManageStatistik';
import ManageBlog from './pages/admin/ManageBlog';
import ManageAnggota from './pages/admin/ManageAnggota';

// Global Styles
import './styles/global.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/program-kerja" element={<ProgramKerja />} />
                <Route path="/statistik" element={<Statistik />} />
                <Route path="/merchandise" element={<Merchandise />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />

                {/* Admin Routes - no ProtectedRoute blocking */}
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/profil" element={<ManageProfil />} />
                <Route path="/admin/anggota" element={<ManageAnggota />} />
                <Route path="/admin/program-kerja" element={<ManageProgramKerja />} />
                <Route path="/admin/merchandise" element={<ManageMerchandise />} />
                <Route path="/admin/statistik" element={<ManageStatistik />} />
                <Route path="/admin/blog" element={<ManageBlog />} />
              </Routes>
            </main>
            <Footer />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#333',
                  color: '#fff',
                  borderRadius: '8px',
                },
                success: {
                  iconTheme: {
                    primary: '#2D5A27',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
