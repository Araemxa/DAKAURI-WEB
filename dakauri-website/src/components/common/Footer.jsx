import { Link, useLocation } from 'react-router-dom';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiInstagram, 
  FiYoutube, 
  FiTwitter,
  FiFacebook
} from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Hide footer on login page and admin pages
  if (location.pathname === '/login' || location.pathname.startsWith('/admin')) {
    return null;
  }

  const quickLinks = [
    { path: '/profil', label: 'Profil Organisasi' },
    { path: '/program-kerja', label: 'Program Kerja' },
    { path: '/statistik', label: 'Statistik' },
    { path: '/merchandise', label: 'Merchandise' },
    { path: '/blog', label: 'Blog' },
  ];

  const socialLinks = [
    { icon: FiInstagram, url: '#', label: 'Instagram' },
    { icon: FiYoutube, url: '#', label: 'YouTube' },
    { icon: FiTwitter, url: '#', label: 'Twitter' },
    { icon: FiFacebook, url: '#', label: 'Facebook' },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">🌿</span>
                <span className="logo-text">DAKAURI</span>
              </div>
              <p className="footer-tagline">
                Membangun generasi muda yang peduli lingkungan dan berkarakter melalui berbagai program kerja yang inspiratif.
              </p>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="social-link"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4>Kontak</h4>
              <ul className="contact-info">
                <li>
                  <FiMapPin />
                  <span>Blok B7/P, Jl. Cendrawasih Raya Bintaro Jaya, Sawah Baru, Kec. Ciputat, Kota Tangerang Selatan, Banten 15413</span>
                </li>
                <li>
                  <FiPhone />
                  <span>+62 812 3456 7890</span>
                </li>
                <li>
                  <FiMail />
                  <span>info@dakauri.org</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-section">
              <h4>Newsletter</h4>
              <p>Dapatkan update terbaru dari DAKAURI</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} DAKAURI. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
