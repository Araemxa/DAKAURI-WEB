import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiArrowLeft, FiShield, FiUsers, FiTrendingUp } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import logoImg from '../../assets/images/logo.png';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Email dan password harus diisi');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    
    if (result.success) {
      toast.success('Login berhasil!');
      navigate(from, { replace: true });
    } else {
      toast.error(result.error || 'Login gagal');
    }
    
    setLoading(false);
  };

  return (
    <div className="login-page">
      {/* Background decorations */}
      <div className="login-bg-decor">
        <div className="login-bg-circle login-bg-circle-1"></div>
        <div className="login-bg-circle login-bg-circle-2"></div>
        <div className="login-bg-circle login-bg-circle-3"></div>
      </div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/" className="login-back-btn">
          <FiArrowLeft />
          <span>Beranda</span>
        </Link>
      </motion.div>

      <div className="login-content">
        {/* Form Card - Centered */}
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="login-card-header">
            <h2>Selamat Datang! 👋</h2>
            <p>Masuk ke akun Anda untuk melanjutkan</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className={`login-field ${focusedField === 'email' ? 'focused' : ''} ${email ? 'has-value' : ''}`}>
              <label className="login-field-label">Email</label>
              <div className="login-input-wrap">
                <div className="login-input-icon">
                  <FiMail />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="nama@email.com"
                  className="login-input"
                  disabled={loading}
                />
              </div>
            </div>

            <div className={`login-field ${focusedField === 'password' ? 'focused' : ''} ${password ? 'has-value' : ''}`}>
              <label className="login-field-label">Password</label>
              <div className="login-input-wrap">
                <div className="login-input-icon">
                  <FiLock />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Masukkan password"
                  className="login-input"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="login-remember">
                <input type="checkbox" />
                <span className="login-checkbox-custom"></span>
                <span>Ingat saya</span>
              </label>
              <Link to="/forgot-password" className="login-forgot">
                Lupa password?
              </Link>
            </div>

            <motion.button 
              type="submit" 
              className="login-submit-btn"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="login-spinner-wrap">
                  <span className="login-spinner"></span>
                  Memproses...
                </div>
              ) : (
                <>
                  Masuk
                  <FiArrowRight />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
