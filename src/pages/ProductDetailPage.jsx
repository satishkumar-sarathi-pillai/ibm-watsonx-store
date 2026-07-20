import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, ChevronLeft, Check, Zap, Shield, Truck } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = getProductById(id);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);

  if (!product) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
          <h2>Product not found</h2>
          <Link to="/store" style={{ color: 'var(--wx-blue)' }}>← Back to store</Link>
        </div>
      </div>
    );
  }

  const plan = product.plans[selectedPlan];

  const handleAddToCart = () => {
    addToCart(product, plan);
    toast.success(`${product.name} added to basket!`);
  };

  const handleBuyNow = () => {
    addToCart(product, plan);
    navigate('/checkout');
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.breadcrumb}>
        <Link to="/store">Phones</Link>
        <ChevronLeft size={14} style={{ transform: 'rotate(180deg)' }} />
        <span>{product.name}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <div className={styles.imageWrap}>
            {product.badge && <span className={styles.badge} style={{ background: product.badgeColor }}>{product.badge}</span>}
            <img src={product.image} alt={product.name} className={styles.productImage} />
          </div>

          <div className={styles.colorSection}>
            <p className={styles.sectionLabel}>Colour: <strong>{product.colors[selectedColor]}</strong></p>
            <div className={styles.colorDots}>
              {product.colors.map((color, index) => (
                <button
                  key={color}
                  className={`${styles.colorDot} ${index === selectedColor ? styles.colorDotActive : ''}`}
                  onClick={() => setSelectedColor(index)}
                  title={color}
                  style={{ background: ['#1a1a1a', '#1a3a6e', '#f5f5f0', '#e8e8e8', '#ffd700', '#4a90d9', '#f4e4c1', '#7b3f00', '#2d5a27', '#c8a96e'][index % 10] }}
                />
              ))}
            </div>
          </div>

          <div className={styles.storageSection}>
            <p className={styles.sectionLabel}>Storage</p>
            <div className={styles.storagePills}>
              {product.storage.map((size, index) => (
                <button key={size} className={`${styles.storagePill} ${index === selectedStorage ? styles.storagePillActive : ''}`} onClick={() => setSelectedStorage(index)}>
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.detailSection}>
          <div className={styles.productBrand}>{product.brand}</div>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productTagline}>{product.tagline}</p>

          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} fill={star <= Math.round(product.rating) ? '#f1c21b' : 'none'} stroke={star <= Math.round(product.rating) ? '#f1c21b' : '#d1d1d1'} />
              ))}
            </div>
            <span className={styles.ratingText}>{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
          </div>

          <div className={styles.specs}>
            <h3>Key specifications</h3>
            <div className={styles.specGrid}>
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className={styles.specItem}>
                  <span className={styles.specKey}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <span className={styles.specVal}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.planSection}>
            <h3>Choose your plan</h3>
            <div className={styles.planCards}>
              {product.plans.map((p, index) => (
                <button key={p.id} className={`${styles.planCard} ${index === selectedPlan ? styles.planCardActive : ''}`} onClick={() => setSelectedPlan(index)}>
                  {index === 1 && <div className={styles.planBest}>Most Popular</div>}
                  <div className={styles.planName}>{p.name}</div>
                  <div className={styles.planData}>{p.data} data</div>
                  <div className={styles.planIncludes}>
                    <span><Check size={12} /> Unlimited calls</span>
                    <span><Check size={12} /> Unlimited texts</span>
                    <span><Check size={12} /> {p.contractMonths}-month contract</span>
                    {p.upfrontCost === 0 && <span><Check size={12} /> No upfront cost</span>}
                  </div>
                  <div className={styles.planPrice}><strong>£{p.monthlyPrice}</strong>/mo{p.upfrontCost > 0 && <small> + £{p.upfrontCost} upfront</small>}</div>
                  {index === selectedPlan && <div className={styles.planCheck}><Check size={16} /></div>}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.ctaSection}>
            <div className={styles.totalPrice}>
              <span>Monthly cost</span>
              <strong>£{plan.monthlyPrice}/mo</strong>
            </div>

            <div className={styles.ctaBtns}>
              <button className={styles.addToCartBtn} onClick={handleAddToCart}><ShoppingCart size={18} /> Add to basket</button>
              <button className={styles.buyNowBtn} onClick={handleBuyNow}><Zap size={18} /> Buy now</button>
            </div>

            <div className={styles.ctaPerks}>
              <span><Truck size={14} /> Free next-day delivery</span>
              <span><Shield size={14} /> 30-day returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
