import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaSearch, 
  FaTags,
  FaArrowRight,
  FaClock,
  FaComment
} from 'react-icons/fa';
import { blogService } from '../../services/api';
import Loading from '../../components/common/Loading';
import './Blog.css';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('semua');

  const categories = [
    { id: 'semua', name: 'Semua' },
    { id: 'kegiatan', name: 'Kegiatan' },
    { id: 'edukasi', name: 'Edukasi' },
    { id: 'tips', name: 'Tips' },
    { id: 'berita', name: 'Berita' }
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await blogService.getAll();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'semua' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = articles[0];
  const regularArticles = filteredArticles.slice(selectedCategory === 'semua' && !searchTerm ? 1 : 0);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Blog & Artikel</h1>
            <p>Cerita, tips, dan informasi seputar pelestarian alam dan kegiatan DAKAURI</p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="blog-filters">
        <div className="container">
          <div className="filters-wrapper">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="category-tabs">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {selectedCategory === 'semua' && !searchTerm && featuredArticle && (
        <section className="featured-article">
          <div className="container">
            <motion.div 
              className="featured-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="featured-image">
                <img src={featuredArticle.image} alt={featuredArticle.title} />
                <span className="featured-badge">Artikel Terbaru</span>
              </div>
              <div className="featured-content">
                <span className="category-tag">{featuredArticle.category}</span>
                <h2>{featuredArticle.title}</h2>
                <p>{featuredArticle.excerpt}</p>
                <div className="article-meta">
                  <span><FaUser /> {featuredArticle.author}</span>
                  <span><FaCalendarAlt /> {formatDate(featuredArticle.published_at || featuredArticle.created_at)}</span>
                  <span><FaClock /> {featuredArticle.read_time || 5} min baca</span>
                </div>
                <Link to={`/blog/${featuredArticle.id}`} className="btn btn-primary">
                  Baca Selengkapnya <FaArrowRight />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="articles-section section">
        <div className="container">
          {regularArticles.length === 0 ? (
            <div className="empty-state">
              <p>Tidak ada artikel yang ditemukan</p>
            </div>
          ) : (
            <div className="articles-grid">
              {regularArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  className="article-card card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={`/blog/${article.id}`} className="article-image">
                    <img src={article.image} alt={article.title} />
                    <span className="category-tag">{article.category}</span>
                  </Link>
                  <div className="article-content">
                    <div className="article-meta-top">
                      <span><FaCalendarAlt /> {formatDate(article.published_at || article.created_at)}</span>
                      <span><FaClock /> {article.read_time || 5} min</span>
                    </div>
                    <Link to={`/blog/${article.id}`}>
                      <h3>{article.title}</h3>
                    </Link>
                    <p>{article.excerpt}</p>
                    <div className="article-footer">
                      <div className="author-info">
                        <FaUser />
                        <span>{article.author}</span>
                      </div>
                      <div className="comments-count">
                        <FaComment />
                        <span>{article.comments_count || 0}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="newsletter-section">
        <div className="container">
          <motion.div 
            className="newsletter-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="newsletter-content">
              <FaTags className="newsletter-icon" />
              <h2>Berlangganan Newsletter</h2>
              <p>Dapatkan artikel terbaru dan informasi kegiatan DAKAURI langsung di inbox Anda</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Masukkan email Anda" />
                <button type="submit" className="btn btn-primary">Berlangganan</button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
