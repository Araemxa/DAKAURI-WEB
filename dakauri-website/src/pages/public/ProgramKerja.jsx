import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiUsers, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { programKerjaService } from '../../services/api';
import Loading from '../../components/common/Loading';
import './ProgramKerja.css';

const categories = ['Semua', 'konservasi', 'edukasi', 'sosial', 'riset', 'ekspedisi'];
const statuses = ['Semua', 'berlangsung', 'akan-datang', 'selesai'];

const categoryLabels = {
  konservasi: 'Konservasi',
  edukasi: 'Edukasi',
  sosial: 'Sosial',
  riset: 'Riset',
  ekspedisi: 'Ekspedisi'
};

const ProgramKerja = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [activeStatus, setActiveStatus] = useState('Semua');

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await programKerjaService.getAll();
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const filteredPrograms = programs.filter(program => {
    const categoryMatch = activeCategory === 'Semua' || program.category === activeCategory;
    const statusMatch = activeStatus === 'Semua' || program.status === activeStatus;
    return categoryMatch && statusMatch;
  });

  const getStatusLabel = (status) => {
    const labels = {
      'berlangsung': 'Sedang Berjalan',
      'akan-datang': 'Akan Datang',
      'selesai': 'Selesai'
    };
    return labels[status] || status;
  };

  const getStatusClass = (status) => {
    const classes = {
      'berlangsung': 'badge-success',
      'akan-datang': 'badge-warning',
      'selesai': 'badge-secondary'
    };
    return classes[status] || '';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="program-kerja-page">
      {/* Hero Section */}
      <section className="program-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-badge">Program Kami</span>
            <h1>Program Kerja DAKAURI</h1>
            <p>Berbagai inisiatif dan kegiatan untuk menciptakan perubahan positif</p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-wrapper">
            <div className="filter-group">
              <span className="filter-label">Kategori:</span>
              <div className="filter-buttons">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category === 'Semua' ? 'Semua' : categoryLabels[category] || category}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <span className="filter-label">Status:</span>
              <div className="filter-buttons">
                {statuses.map((status) => (
                  <button
                    key={status}
                    className={`filter-btn ${activeStatus === status ? 'active' : ''}`}
                    onClick={() => setActiveStatus(status)}
                  >
                    {status === 'Semua' ? status : getStatusLabel(status)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="programs-section section">
        <div className="container">
          <motion.div 
            className="programs-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPrograms.map((program) => (
              <motion.article
                key={program.id}
                className="program-card card"
                variants={itemVariants}
              >
                <div className="program-image">
                  <img src={program.image} alt={program.title} />
                  <span className={`program-status badge ${getStatusClass(program.status)}`}>
                    {getStatusLabel(program.status)}
                  </span>
                  <span className="program-category">{categoryLabels[program.category] || program.category}</span>
                </div>
                <div className="program-content">
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <div className="program-meta">
                    <div className="meta-item">
                      <FiCalendar />
                      <span>{new Date(program.start_date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}</span>
                    </div>
                    <div className="meta-item">
                      <FiUsers />
                      <span>{program.participants || 0} Peserta</span>
                    </div>
                  </div>
                  <Link to={`/program-kerja/${program.id}`} className="program-link">
                    Selengkapnya <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredPrograms.length === 0 && (
            <div className="empty-state">
              <p>Tidak ada program yang ditemukan dengan filter ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="join-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ingin Berpartisipasi?</h2>
            <p>Bergabunglah dengan DAKAURI dan jadilah bagian dari perubahan positif untuk lingkungan.</p>
            <Link to="/register" className="btn btn-primary btn-lg">
              Daftar Sebagai Volunteer
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProgramKerja;
