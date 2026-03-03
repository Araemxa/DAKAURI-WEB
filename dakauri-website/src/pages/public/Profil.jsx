import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiTarget, 
  FiEye, 
  FiHeart,
  FiAward,
  FiMapPin
} from 'react-icons/fi';
import { profilService, anggotaService } from '../../services/api';
import Loading from '../../components/common/Loading';
import './Profil.css';

const nilai = [
  { icon: FiHeart, title: 'Kepedulian', desc: 'Kami peduli terhadap lingkungan dan sesama' },
  { icon: FiUsers, title: 'Kolaborasi', desc: 'Bekerja sama untuk mencapai tujuan bersama' },
  { icon: FiTarget, title: 'Integritas', desc: 'Bertindak dengan jujur dan bertanggung jawab' },
  { icon: FiAward, title: 'Inovasi', desc: 'Mengembangkan solusi kreatif untuk tantangan lingkungan' }
];

const Profil = () => {
  const [profilData, setProfilData] = useState({ visi: '', misi: [], sejarah: '', struktur: [] });
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const [data, anggotaData] = await Promise.all([
          profilService.getAll(),
          anggotaService.getActive()
        ]);
        const visiItem = data.find(d => d.type === 'visi');
        const misiItems = data.filter(d => d.type === 'misi').sort((a, b) => a.sort_order - b.sort_order);
        const sejarahItem = data.find(d => d.type === 'sejarah');
        const strukturItems = data.filter(d => d.type === 'struktur');
        setProfilData({
          visi: visiItem?.content || '',
          misi: misiItems.map(m => m.content),
          sejarah: sejarahItem?.content || '',
          struktur: strukturItems
        });
        setAnggota(anggotaData);
      } catch (error) {
        console.error('Error fetching profil:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfil();
  }, []);

  if (loading) return <Loading />;

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
    <div className="profil-page">
      {/* Hero Section */}
      <section className="profil-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-badge">Tentang Kami</span>
            <h1>Profil Organisasi DAKAURI</h1>
            <p>Mengenal lebih dekat organisasi yang berdedikasi untuk lingkungan</p>
          </motion.div>
        </div>
      </section>

      {/* Visi Misi Section */}
      <section className="visi-misi-section section">
        <div className="container">
          <div className="visi-misi-grid">
            <motion.div
              className="visi-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="card-icon">
                <FiEye />
              </div>
              <h2>Visi</h2>
              <p>{profilData.visi}</p>
            </motion.div>

            <motion.div
              className="misi-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="card-icon">
                <FiTarget />
              </div>
              <h2>Misi</h2>
              <ul className="misi-list">
                {profilData.misi.map((misi, index) => (
                  <li key={index}>
                    <span className="misi-number">{index + 1}</span>
                    {misi}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sejarah Section */}
      <section className="sejarah-section section">
        <div className="container">
          <div className="sejarah-grid">
            <motion.div
              className="sejarah-images"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500" 
                alt="DAKAURI History"
                className="sejarah-img-main"
              />
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300" 
                alt="DAKAURI Activity"
                className="sejarah-img-secondary"
              />
              <div className="year-badge">
                <span>2014</span>
                <p>Tahun Berdiri</p>
              </div>
            </motion.div>
            <motion.div
              className="sejarah-content"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Sejarah</span>
              <h2>Perjalanan DAKAURI</h2>
              <div className="sejarah-text">
                {profilData.sejarah.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nilai Section */}
      <section className="nilai-section section">
        <div className="container">
          <div className="section-title">
            <span className="section-label">Nilai-Nilai</span>
            <h2>Nilai yang Kami Pegang</h2>
            <p>Fondasi yang menjadi dasar setiap langkah kami</p>
          </div>
          <motion.div 
            className="nilai-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {nilai.map((val, index) => (
              <motion.div
                key={index}
                className="nilai-card"
                variants={itemVariants}
              >
                <div className="nilai-icon">
                  <val.icon />
                </div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tim / Anggota Section */}
      <section className="tim-section section">
        <div className="container">
          <div className="section-title">
            <span className="section-label">Tim Kami</span>
            <h2>Pengurus & Anggota DAKAURI</h2>
            <p>Orang-orang hebat di balik setiap program kami</p>
          </div>

          {/* Pengurus Inti */}
          {(() => {
            const pengurus = anggota.filter(a => ['ketua','wakil','sekretaris_1','sekretaris_2','bendahara_1','bendahara_2'].includes(a.jabatan));
            const jabatanLabel = { ketua: 'Ketua', wakil: 'Wakil Ketua', sekretaris_1: 'Sekretaris 1', sekretaris_2: 'Sekretaris 2', bendahara_1: 'Bendahara 1', bendahara_2: 'Bendahara 2' };
            const jabatanOrder = ['ketua','wakil','sekretaris_1','sekretaris_2','bendahara_1','bendahara_2'];
            const sorted = pengurus.sort((a,b) => jabatanOrder.indexOf(a.jabatan) - jabatanOrder.indexOf(b.jabatan));
            if (sorted.length === 0) return null;
            return (
              <>
                <h3 className="anggota-group-title">Badan Pengurus Harian</h3>
                <motion.div className="tim-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  {sorted.map(member => (
                    <motion.div key={member.id} className="tim-card" variants={itemVariants}>
                      <div className="tim-image">
                        <img src={member.foto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300'} alt={member.nama} />
                      </div>
                      <div className="tim-info">
                        <h3>{member.nama}</h3>
                        <p>{jabatanLabel[member.jabatan] || member.jabatan}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            );
          })()}

          {/* Koordinator & Anggota per Divisi */}
          {(() => {
            const divisiList = ['BPH','SOSMAS','PSDM','KOMINFO','KWU'];
            const divisiAnggota = anggota.filter(a => ['koordinator','anggota'].includes(a.jabatan));
            if (divisiAnggota.length === 0 && anggota.filter(a => ['ketua','wakil','sekretaris_1','sekretaris_2','bendahara_1','bendahara_2'].includes(a.jabatan)).length === 0) {
              return <p style={{textAlign:'center', color:'#666'}}>Data anggota belum tersedia</p>;
            }
            return divisiList.map(divisi => {
              const members = divisiAnggota.filter(a => a.divisi === divisi).sort((a,b) => {
                if (a.jabatan === 'koordinator' && b.jabatan !== 'koordinator') return -1;
                if (a.jabatan !== 'koordinator' && b.jabatan === 'koordinator') return 1;
                return a.sort_order - b.sort_order;
              });
              if (members.length === 0) return null;
              return (
                <div key={divisi}>
                  <h3 className="anggota-group-title">Divisi {divisi}</h3>
                  <motion.div className="tim-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {members.map(member => (
                      <motion.div key={member.id} className="tim-card" variants={itemVariants}>
                        <div className="tim-image">
                          <img src={member.foto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300'} alt={member.nama} />
                        </div>
                        <div className="tim-info">
                          <h3>{member.nama}</h3>
                          <p>{member.jabatan === 'koordinator' ? 'Koordinator' : 'Anggota'}</p>
                          {member.divisi && <span className="tim-divisi">{member.divisi}</span>}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            });
          })()}
        </div>
      </section>

      {/* Lokasi Section */}
      <section className="lokasi-section section">
        <div className="container">
          <div className="lokasi-grid">
            <motion.div
              className="lokasi-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Lokasi</span>
              <h2>Temukan Kami</h2>
              <p>
                Temui kami di UPJ dan bergabunglah dalam kegiatan seru bersama DAKAURI! Kunjungi sekretariat kami untuk mengenal lebih dekat dan ikut serta dalam berbagai aktivitas menarik yang kami tawarkan!
              </p>
              <div className="lokasi-info">
                <div className="info-item">
                  <FiMapPin />
                  <span>Blok B7/P, Jl. Cendrawasih Raya Bintaro Jaya, Sawah Baru, Kec. Ciputat, Kota Tangerang Selatan, Banten 15413</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="lokasi-map"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.5!2d106.7259259568528!3d-6.291554872860591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTcnMjkuNiJTIDEwNsKwNDMnMzMuMyJF!5e0!3m2!1sid!2sid!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '16px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi DAKAURI - UPJ"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profil;
