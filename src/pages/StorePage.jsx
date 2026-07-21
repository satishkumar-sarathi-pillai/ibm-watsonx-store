import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, ShoppingCart, ChevronRight, Zap, Shield, Truck, Headphones } from 'lucide-react';
import Navbar from '../components/Navbar';
import { products, brands } from '../data/products';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import styles from './StorePage.module.css';

export default function StorePage() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) {
      list = list.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedBrand !== 'All') {
      list = list.filter((product) => product.brand === selectedBrand);
    }
    if (sortBy === 'price-asc') list.sort((a, b) => a.plans[0].monthlyPrice - b.plans[0].monthlyPrice);
    if (sortBy === 'price-desc') list.sort((a, b) => b.plans[0].monthlyPrice - a.plans[0].monthlyPrice);
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, selectedBrand, sortBy]);

  const handleQuickAdd = (product, event) => {
    event.preventDefault();
    addToCart(product, product.plans[1]);
    toast.success(`${product.name} added to basket!`);
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}><Zap size={14} /> IBM WatsonX 5G Network</div>
            <h1>Latest Phones</h1>
            <p>Discover the newest smartphones with AI-powered plans. Free delivery on all orders.</p>
            <div className={styles.heroStats}>
              <div className={styles.stat}><strong>5G</strong><span>Network</span></div>
              <div className={styles.statDivider} />
              <div className={styles.stat}><strong>0-24mo</strong><span>Contracts</span></div>
              <div className={styles.statDivider} />
              <div className={styles.stat}><strong>Free</strong><span>Delivery</span></div>
            </div>
          </div>
          <div className={styles.heroBadges}>
            <div className={styles.trustBadge}><Shield size={20} /> 30-day returns</div>
            <div className={styles.trustBadge}><Truck size={20} /> Free next-day delivery</div>
            <div className={styles.trustBadge}><Headphones size={20} /> 24/7 AI support</div>
          </div>
        </div>
      </section>

      <div className={styles.filtersBar}>
        <div className={styles.filtersInner}>
          <div className={styles.searchWrap}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search phones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.brandPills}>
            {brands.map((brand) => (
              <button
                key={brand}
                className={`${styles.pill} ${selectedBrand === brand ? styles.pillActive : ''}`}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </button>
            ))}
          </div>

          <div className={styles.sortWrap}>
            <SlidersHorizontal size={16} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.sortSelect}>
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.results}><span>{filtered.length} phones found</span></div>

      <div className={styles.grid}>
        {filtered.length === 0 ? (
          <div className={styles.noResults}>
            <span>🔍</span>
            <h3>No phones found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          filtered.map((product) => <ProductCard key={product.id} product={product} onQuickAdd={handleQuickAdd} />)
        )}
      </div>

      <section className={styles.perksStrip}>
        <div className={styles.perksInner}>
          {[
            { icon: '🚚', title: 'Free Delivery', desc: 'Next-day on all orders' },
            { icon: '🔄', title: '30-Day Returns', desc: 'No questions asked' },
            { icon: '🤖', title: 'AI Support', desc: 'WatsonX-powered help' },
            { icon: '🔒', title: 'Secure Checkout', desc: 'Bank-grade encryption' }
          ].map((perk) => (
            <div key={perk.title} className={styles.perk}>
              <span className={styles.perkIcon}>{perk.icon}</span>
              <div>
                <strong>{perk.title}</strong>
                <p>{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2024 IBM WatsonX Store. All rights reserved. | IBM WatsonX is a demo application.</p>
      </footer>
    </div>
  );
}

function ProductCard({ product, onQuickAdd }) {
  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <div className={styles.cardImageWrap}>
        {product.badge && <span className={styles.cardBadge} style={{ background: product.badgeColor }}>{product.badge}</span>}
        <img src={product.image} alt={product.name} className={styles.cardImage} loading="lazy" />
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardBrand}>{product.brand}</div>
        <h3 className={styles.cardName}>{product.name}</h3>
        <p className={styles.cardTagline}>{product.tagline}</p>

        <div className={styles.cardRating}>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={13} fill={star <= Math.round(product.rating) ? '#f1c21b' : 'none'} stroke={star <= Math.round(product.rating) ? '#f1c21b' : '#d1d1d1'} />
            ))}
          </div>
          <span>{product.rating} ({product.reviews.toLocaleString()})</span>
        </div>

        <div className={styles.cardPlans}>
          {product.plans.slice(0, 3).map((plan) => (
            <div key={plan.id} className={styles.planPill}>{plan.data}</div>
          ))}
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.cardPrice}>
            <span className={styles.from}>from</span>
            <span className={styles.price}>£{product.plans[0].monthlyPrice}</span>
            <span className={styles.perMonth}>/mo</span>
          </div>
          <button className={styles.addBtn} onClick={(e) => onQuickAdd(product, e)} aria-label={`Add ${product.name} to basket`}>
            <ShoppingCart size={16} />
          </button>
        </div>

        <div className={styles.viewBtn}>View deal <ChevronRight size={14} /></div>
      </div>
    </Link>
  );
}
