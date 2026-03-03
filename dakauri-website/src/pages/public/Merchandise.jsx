import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';
import { merchandiseService } from '../../services/api';
import Loading from '../../components/common/Loading';
import './Merchandise.css';

const categories = ['Semua', 'pakaian', 'aksesoris', 'tas', 'stiker', 'lainnya'];
const categoryLabels = { pakaian: 'Pakaian', aksesoris: 'Aksesoris', tas: 'Tas', stiker: 'Stiker', lainnya: 'Lainnya' };

const Merchandise = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await merchandiseService.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(product => activeCategory === 'Semua' || product.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return Number(a.price) - Number(b.price);
      if (sortBy === 'price-high') return Number(b.price) - Number(a.price);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, productId: product.id, price: Number(product.price) });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="merchandise-page">
      {/* Hero Section */}
      <section className="merch-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-badge">🛍️ Toko Merchandise</span>
            <h1>Merchandise DAKAURI</h1>
            <p>Dukung gerakan lingkungan dengan merchandise eksklusif kami</p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="merch-filters">
        <div className="container">
          <div className="filters-wrapper">
            <div className="category-filters">
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
            <div className="sort-view-options">
              <div className="sort-dropdown">
                <FiFilter />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Urutan Default</option>
                  <option value="price-low">Harga: Rendah ke Tinggi</option>
                  <option value="price-high">Harga: Tinggi ke Rendah</option>
                  <option value="name">Nama: A-Z</option>
                </select>
              </div>
              <div className="view-toggle">
                <button 
                  className={viewMode === 'grid' ? 'active' : ''}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid />
                </button>
                <button 
                  className={viewMode === 'list' ? 'active' : ''}
                  onClick={() => setViewMode('list')}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section section">
        <div className="container">
          <motion.div 
            className={`products-grid ${viewMode}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="product-card card"
                variants={itemVariants}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-actions">
                    <button className="action-btn wishlist">
                      <FiHeart />
                    </button>
                    <button 
                      className="action-btn add-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FiShoppingCart />
                    </button>
                  </div>
                  {product.stock < 20 && (
                    <span className="stock-badge">Stok Terbatas</span>
                  )}
                </div>
                <div className="product-info">
                  <span className="product-category">{categoryLabels[product.category] || product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="product-desc">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">{formatPrice(Number(product.price))}</span>
                    <Link 
                      to={`/merchandise/${product.id}`} 
                      className="btn btn-primary btn-sm"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <p>Tidak ada produk ditemukan dalam kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="info-banner">
        <div className="container">
          <div className="banner-content">
            <div className="banner-item">
              <span className="banner-icon">🌿</span>
              <div>
                <h4>Ramah Lingkungan</h4>
                <p>Semua produk dibuat dari bahan berkelanjutan</p>
              </div>
            </div>
            <div className="banner-item">
              <span className="banner-icon">💚</span>
              <div>
                <h4>Mendukung Gerakan</h4>
                <p>Sebagian hasil penjualan untuk program lingkungan</p>
              </div>
            </div>
            <div className="banner-item">
              <span className="banner-icon">📦</span>
              <div>
                <h4>Pengiriman Aman</h4>
                <p>Dikemas dengan kemasan ramah lingkungan</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Merchandise;
