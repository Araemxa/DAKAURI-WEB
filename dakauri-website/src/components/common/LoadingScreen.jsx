import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/images/logo2.png';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 5000; // total 5s
    const steps = 100;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      // Simulate realistic loading with variable speed
      const remaining = 100 - current;
      const increment = Math.max(0.3, remaining * 0.035 + Math.random() * 0.8);
      current = Math.min(100, current + increment);
      setProgress(Math.round(current));

      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Background particles */}
          <div className="loading-particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  width: `${4 + Math.random() * 8}px`,
                  height: `${4 + Math.random() * 8}px`,
                }}
              />
            ))}
          </div>

          {/* Glow ring behind logo */}
          <div className="loading-glow-ring" />

          {/* Logo */}
          <motion.div
            className="loading-logo-wrapper"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 100, 
              damping: 15, 
              duration: 0.8 
            }}
          >
            <div className="loading-logo-pulse" />
            <img src={logo} alt="DAKAURI" className="loading-logo" />
          </motion.div>

          {/* Brand name */}
          <motion.div
            className="loading-brand"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h1 className="loading-title">DAKAURI</h1>
            <p className="loading-subtitle">Bersatu Siap Membangun</p>
          </motion.div>

          {/* Progress section */}
          <motion.div
            className="loading-progress-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="loading-bar-track">
              <motion.div
                className="loading-bar-fill"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <div 
                className="loading-bar-glow"
                style={{ left: `${progress}%` }}
              />
            </div>
            <div className="loading-info">
              <span className="loading-status">
                {progress < 30 ? 'Memuat aset...' : progress < 60 ? 'Menyiapkan halaman...' : progress < 90 ? 'Hampir selesai...' : 'Siap!'}
              </span>
              <span className="loading-percent">{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="loading-screen loading-exit"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: 0,
            scale: 1.1,
          }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <div className="loading-particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  width: `${4 + Math.random() * 8}px`,
                  height: `${4 + Math.random() * 8}px`,
                }}
              />
            ))}
          </div>
          <div className="loading-glow-ring" />
          <div className="loading-logo-wrapper">
            <div className="loading-logo-pulse" />
            <img src={logo} alt="DAKAURI" className="loading-logo" />
          </div>
          <div className="loading-brand">
            <h1 className="loading-title">DAKAURI</h1>
            <p className="loading-subtitle">Bersatu Siap Membangun</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
