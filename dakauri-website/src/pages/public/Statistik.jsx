import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiTarget, 
  FiAward, 
  FiTrendingUp,
  FiCalendar,
  FiMapPin,
  FiHeart
} from 'react-icons/fi';
import { statistikService } from '../../services/api';
import Loading from '../../components/common/Loading';
import './Statistik.css';

const iconMap = {
  users: FiUsers,
  tree: FiTarget,
  calendar: FiCalendar,
  trophy: FiAward,
  heart: FiHeart,
  chart: FiTrendingUp,
  map: FiMapPin,
};

const Statistik = () => {
  const [mainStats, setMainStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statistikService.getAll();
        setMainStats(data.map(s => ({
          ...s,
          IconComponent: iconMap[s.icon] || FiTrendingUp
        })));
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

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
    <div className="statistik-page">
      {/* Hero Section */}
      <section className="statistik-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-badge">Data & Statistik</span>
            <h1>Statistik Organisasi</h1>
            <p>Melihat perjalanan dan pencapaian DAKAURI dalam angka</p>
          </motion.div>
        </div>
      </section>

      {/* Main Stats Section */}
      <section className="main-stats-section">
        <div className="container">
          <motion.div 
            className="main-stats-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {mainStats.map((stat, index) => (
              <motion.div
                key={stat.id || index}
                className="main-stat-card"
                variants={itemVariants}
              >
                <div className="stat-icon-wrapper">
                  <stat.IconComponent />
                </div>
                <div className="stat-details">
                  <h3>{Number(stat.value).toLocaleString()}</h3>
                  <p>{stat.title}</p>
                </div>
                {stat.description && <span className="stat-trend">{stat.description}</span>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="impact-section section">
        <div className="container">
          <div className="section-title">
            <span className="section-label">Dampak Kami</span>
            <h2>Kontribusi untuk Lingkungan</h2>
            <p>Hasil nyata dari program-program DAKAURI</p>
          </div>
          <motion.div 
            className="impact-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {mainStats.slice(0, 4).map((stat, index) => (
              <motion.div
                key={stat.id || index}
                className="impact-card"
                variants={itemVariants}
              >
                <h3>{Number(stat.value).toLocaleString()}</h3>
                <p>{stat.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Growth Section */}
      <section className="growth-section section">
        <div className="container">
          <div className="section-title">
            <span className="section-label">Pertumbuhan</span>
            <h2>Perkembangan DAKAURI</h2>
            <p>Perjalanan kami dari tahun ke tahun</p>
          </div>
          <div className="growth-content">
            <div className="timeline">
              {[
                { year: 2020, members: 150, programs: 12, volunteers: 300 },
                { year: 2021, members: 250, programs: 25, volunteers: 500 },
                { year: 2022, members: 380, programs: 40, volunteers: 800 },
                { year: 2023, members: 450, programs: 52, volunteers: 1000 },
                { year: 2024, members: 532, programs: 58, volunteers: 1250 },
              ].map((data, index) => (
                <motion.div
                  key={data.year}
                  className="timeline-item"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="timeline-year">{data.year}</div>
                  <div className="timeline-content">
                    <div className="timeline-stats">
                      <div className="timeline-stat">
                        <FiUsers />
                        <span>{data.members} Anggota</span>
                      </div>
                      <div className="timeline-stat">
                        <FiTarget />
                        <span>{data.programs} Program</span>
                      </div>
                      <div className="timeline-stat">
                        <FiHeart />
                        <span>{data.volunteers} Volunteer</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="chart-visual">
              <h4>Grafik Pertumbuhan Anggota</h4>
              <div className="bar-chart">
                {[
                  { year: 2020, members: 150 },
                  { year: 2021, members: 250 },
                  { year: 2022, members: 380 },
                  { year: 2023, members: 450 },
                  { year: 2024, members: 532 },
                ].map((data, index) => (
                  <div key={data.year} className="bar-item">
                    <motion.div 
                      className="bar"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(data.members / 600) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                    <span className="bar-label">{data.year}</span>
                    <span className="bar-value">{data.members}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section section">
        <div className="container">
          <div className="section-title">
            <span className="section-label">Penghargaan</span>
            <h2>Pencapaian Kami</h2>
            <p>Apresiasi yang telah diterima DAKAURI</p>
          </div>
          <motion.div 
            className="achievements-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { year: 2023, title: 'Green Organization Award', issuer: 'Kementerian Lingkungan Hidup' },
              { year: 2023, title: 'Best Youth Environmental Initiative', issuer: 'UN Environment' },
              { year: 2022, title: 'Social Impact Award', issuer: 'Yayasan Lingkungan Indonesia' },
              { year: 2022, title: 'Young Eco Warriors Trophy', issuer: 'WWF Indonesia' },
              { year: 2021, title: 'Community Service Excellence', issuer: 'Pemerintah Daerah' },
            ].map((achievement, index) => (
              <motion.div
                key={index}
                className="achievement-card"
                variants={itemVariants}
              >
                <div className="achievement-year">{achievement.year}</div>
                <div className="achievement-icon">
                  <FiAward />
                </div>
                <h3>{achievement.title}</h3>
                <p>{achievement.issuer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="locations-section section">
        <div className="container">
          <div className="locations-grid">
            <motion.div
              className="locations-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Jangkauan</span>
              <h2>Area Kegiatan</h2>
              <p>
                DAKAURI telah melaksanakan program di berbagai daerah di Indonesia.
                Berikut adalah sebaran kegiatan kami.
              </p>
              <div className="locations-list">
                {[
                  { name: 'Jawa Barat', projects: 15 },
                  { name: 'Jawa Tengah', projects: 12 },
                  { name: 'Jawa Timur', projects: 10 },
                  { name: 'Bali', projects: 8 },
                  { name: 'Sulawesi Selatan', projects: 6 },
                ].map((location, index) => (
                  <div key={index} className="location-item">
                    <FiMapPin />
                    <span className="location-name">{location.name}</span>
                    <span className="location-count">{location.projects} Proyek</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="locations-visual"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=600" 
                alt="Indonesia Map"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Statistik;
