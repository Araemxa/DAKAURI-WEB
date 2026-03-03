import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowRight, 
  FiUsers, 
  FiTarget, 
  FiAward, 
  FiHeart,
  FiCalendar,
  FiTrendingUp,
  FiShoppingBag,
  FiTag,
  FiPlay,
  FiChevronDown
} from 'react-icons/fi';
import { statistikService, programKerjaService, merchandiseService, blogService } from '../../services/api';
import './Home.css';

const iconMap = {
  users: FiUsers,
  tree: FiTarget,
  calendar: FiCalendar,
  trophy: FiAward,
  heart: FiHeart,
  chart: FiTrendingUp,
};

const fallbackStats = [
  { icon: FiUsers, value: '500+', label: 'Anggota Aktif' },
  { icon: FiTarget, value: '50+', label: 'Program Kerja' },
  { icon: FiAward, value: '25+', label: 'Penghargaan' },
  { icon: FiHeart, value: '1000+', label: 'Volunteer' },
];

const Home = () => {
  const [stats, setStats] = useState(fallbackStats);
  const [programs, setPrograms] = useState([]);
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, programsData, productsData, articlesData] = await Promise.allSettled([
          statistikService.getAll(),
          programKerjaService.getAll(),
          merchandiseService.getAll(),
          blogService.getAll()
        ]);

        if (statsData.status === 'fulfilled' && statsData.value.length > 0) {
          setStats(statsData.value.slice(0, 4).map(s => ({
            icon: iconMap[s.icon] || FiTrendingUp,
            value: Number(s.value).toLocaleString(),
            label: s.title
          })));
        }
        if (programsData.status === 'fulfilled') setPrograms(programsData.value.slice(0, 3));
        if (productsData.status === 'fulfilled') setProducts(productsData.value.slice(0, 3));
        if (articlesData.status === 'fulfilled') setArticles(articlesData.value.slice(0, 2));
      } catch (err) {
        console.error('Error fetching home data:', err);
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay-top"></div>
          <div className="hero-overlay-bottom"></div>
        </div>
        <div className="hero-center-content">
          <motion.span
            className="hero-dakauri-label"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            DAKAURI
          </motion.span>
          <motion.h1
            className="hero-main-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            BERSATU SIAP<br />MEMBANGUN
          </motion.h1>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a href="#video" className="btn-hero-dark">
              <FiPlay />
              Tonton Video Profil
            </a>
            <Link to="/profil" className="btn-hero-outline">
              Profil
            </Link>
          </motion.div>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            DAKAURI merupakan singkatan dari &apos;Dari Kami Untuk Negeri.&apos; Organisasi ini dibentuk oleh mahasiswa UPJ dengan tujuan utama mengabdi kepada masyarakat melalui kegiatan sosial, pendidikan, dan pemberdayaan desa.
          </motion.p>
          <motion.div
            className="hero-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <FiChevronDown className="scroll-arrow" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div 
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                variants={itemVariants}
              >
                <div className="stat-icon">
                  <stat.icon />
                </div>
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview section">
        <div className="container">
          <div className="about-grid">
            <motion.div
              className="about-images"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500" 
                alt="DAKAURI Team"
                className="about-img-1"
              />
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300" 
                alt="DAKAURI Activity"
                className="about-img-2"
              />
              <div className="about-badge">
                <span>10+</span>
                <p>Tahun Berdedikasi</p>
              </div>
            </motion.div>
            <motion.div
              className="about-content"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Tentang Kami</span>
              <h2>Bersama Menjaga Bumi untuk Generasi Mendatang</h2>
              <p>
                DAKAURI didirikan dengan visi untuk menciptakan masyarakat yang sadar 
                dan peduli terhadap kelestarian lingkungan. Melalui berbagai program 
                dan kegiatan, kami berusaha memberikan edukasi dan aksi nyata dalam 
                menjaga keseimbangan alam.
              </p>
              <ul className="about-features">
                <li>
                  <span className="feature-check">✓</span>
                  Program lingkungan berkelanjutan
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  Pemberdayaan pemuda dan komunitas
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  Kolaborasi dengan berbagai pihak
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  Edukasi dan kampanye lingkungan
                </li>
              </ul>
              <Link to="/profil" className="btn btn-primary">
                Pelajari Lebih Lanjut
                <FiArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs-section section">
        <div className="container">
          <div className="section-title">
            <span className="section-label">Program Kerja</span>
            <h2>Program Unggulan Kami</h2>
            <p>Berbagai inisiatif untuk menciptakan perubahan positif</p>
          </div>
          <motion.div 
            className="programs-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {programs.map((program) => (
              <motion.div
                key={program.id}
                className="program-card card"
                variants={itemVariants}
              >
                <div className="program-image">
                  <img src={program.image} alt={program.title} />
                  <span className="program-category">{program.category}</span>
                </div>
                <div className="program-content">
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <Link to={`/program-kerja/${program.id}`} className="program-link">
                    Selengkapnya <FiArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="section-cta">
            <Link to="/program-kerja" className="btn btn-primary">
              Lihat Semua Program
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Merchandise Section */}
      <section className="merchandise-section section">
        <div className="merch-decoration merch-decoration-left"></div>
        <div className="merch-decoration merch-decoration-right"></div>
        <div className="container">
          <div className="section-title">
            <span className="section-label"><FiShoppingBag style={{ marginRight: 6, verticalAlign: 'middle' }} />Merchandise</span>
            <h2>Dukung DAKAURI dengan<br /><span className="text-highlight">Merchandise Eksklusif</span></h2>
            <p>Setiap pembelian membantu mendanai program pelestarian lingkungan kami</p>
          </div>
          <motion.div 
            className="products-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="product-card"
                variants={itemVariants}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-badge">
                    <FiTag /> Eksklusif
                  </div>
                  <div className="product-overlay">
                    <Link to={`/merchandise/${product.id}`} className="product-overlay-btn">
                      <FiShoppingBag />
                      <span>Lihat Detail</span>
                    </Link>
                  </div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-price-row">
                    <p className="product-price">{formatPrice(product.price)}</p>
                    <Link to={`/merchandise/${product.id}`} className="product-cart-btn" aria-label="Lihat detail">
                      <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="section-cta">
            <Link to="/merchandise" className="btn-merch-cta">
              <FiShoppingBag />
              <span>Kunjungi Toko</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section section">
        <div className="container">
          <div className="section-title">
            <span className="section-label">Blog</span>
            <h2>Artikel Terbaru</h2>
            <p>Informasi dan inspirasi seputar lingkungan</p>
          </div>
          <motion.div 
            className="blog-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {articles.map((article) => (
              <motion.article
                key={article.id}
                className="blog-card card"
                variants={itemVariants}
              >
                <div className="blog-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <FiCalendar />
                    <span>{new Date(article.published_at || article.created_at).toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <Link to={`/blog/${article.id}`} className="blog-link">
                    Baca Selengkapnya <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
          <div className="section-cta">
            <Link to="/blog" className="btn btn-secondary">
              Lihat Semua Artikel
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
