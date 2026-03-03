import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTrash, 
  FaMinus, 
  FaPlus, 
  FaShoppingBag,
  FaArrowLeft,
  FaShieldAlt,
  FaTruck,
  FaCreditCard
} from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { orderService } from '../../services/api';
import toast from 'react-hot-toast';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const cartTotal = getCartTotal();
  const cartCount = getCartCount();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    try {
      const orderData = {
        user_id: user.uid,
        items: cartItems.map(item => ({
          product_id: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total_amount: cartTotal
      };
      await orderService.create(orderData);
      toast.success('Pesanan berhasil dibuat! Tim kami akan menghubungi Anda.');
      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Gagal membuat pesanan. Silakan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="empty-content"
          >
            <div className="empty-icon">
              <FaShoppingBag />
            </div>
            <h2>Keranjang Kosong</h2>
            <p>Belum ada produk di keranjang belanja Anda</p>
            <Link to="/merchandise" className="btn btn-primary">
              Mulai Belanja
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="cart-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/merchandise" className="back-link">
            <FaArrowLeft /> Kembali Belanja
          </Link>
          <h1>Keranjang Belanja ({cartCount} item)</h1>
        </motion.div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.productId}
                  className="cart-item card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <div className="item-info">
                      <span className="item-category">{item.category}</span>
                      <h3>{item.name}</h3>
                      <p className="item-price">{formatPrice(item.price)}</p>
                    </div>
                    <div className="item-actions">
                      <div className="quantity-control">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                          <FaPlus />
                        </button>
                      </div>
                      <p className="item-subtotal">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div 
            className="order-summary card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Ringkasan Pesanan</h2>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({cartCount} item)</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Ongkos Kirim</span>
                <span className="free-shipping">GRATIS</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button 
              className="checkout-btn btn btn-primary"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Memproses...' : 'Checkout Sekarang'}
            </button>

            <div className="trust-badges">
              <div className="badge">
                <FaShieldAlt />
                <span>Pembayaran Aman</span>
              </div>
              <div className="badge">
                <FaTruck />
                <span>Gratis Ongkir</span>
              </div>
              <div className="badge">
                <FaCreditCard />
                <span>Berbagai Metode Bayar</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
