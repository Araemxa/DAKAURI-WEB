import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiX, 
  FiShoppingCart, 
  FiUser, 
  FiLogOut,
  FiHome,
  FiInfo,
  FiBriefcase,
  FiBarChart2,
  FiShoppingBag,
  FiFileText,
  FiSettings
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import logoImg from '../../assets/images/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const { getCartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Hide navbar on login page and admin pages
  if (location.pathname === '/login' || location.pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { path: '/', label: 'Beranda', icon: FiHome },
    { path: '/profil', label: 'Profil', icon: FiInfo },
    { path: '/program-kerja', label: 'Program', icon: FiBriefcase },
    { path: '/statistik', label: 'Statistik', icon: FiBarChart2 },
    { path: '/blog', label: 'Blog', icon: FiFileText },
    { path: '/merchandise', label: 'Store', icon: FiShoppingBag },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <motion.div 
            className="brand-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={logoImg} alt="DAKAURI" className="brand-logo-img" />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              <link.icon className="nav-icon" />
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          <Link to="/keranjang" className="cart-button">
            <FiShoppingCart />
            {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
          </Link>

          {user ? (
            <div className="user-menu">
              <button className="user-button">
                <FiUser />
                <span>{user.email?.split('@')[0]}</span>
              </button>
              <div className="user-dropdown">
                <Link to="/admin" className="dropdown-item">
                  <FiSettings />
                  Dashboard Admin
                </Link>
                <button onClick={handleLogout} className="dropdown-item logout-item">
                  <FiLogOut />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                <link.icon />
                {link.label}
              </Link>
            ))}
            
            <div className="mobile-menu-divider" />
            
            <Link to="/keranjang" className="mobile-nav-link">
              <FiShoppingCart />
              Keranjang
              {getCartCount() > 0 && (
                <span className="mobile-cart-badge">{getCartCount()}</span>
              )}
            </Link>

            {user ? (
              <>
                <Link to="/admin" className="mobile-nav-link">
                  <FiSettings />
                  Dashboard Admin
                </Link>
                <button onClick={handleLogout} className="mobile-nav-link logout">
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="mobile-nav-link login">
                <FiUser />
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
