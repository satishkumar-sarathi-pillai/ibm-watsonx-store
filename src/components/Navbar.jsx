import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, ChevronDown, LogOut, Phone, Wifi, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { label: 'Phones', href: '/store', icon: <Phone size={16} /> },
    { label: 'Deals', href: '/store?filter=deals', icon: <Star size={16} /> },
    { label: 'Plans', href: '/store?filter=plans', icon: <Wifi size={16} /> }
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.topBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 24px' }}>
          <span style={{ fontSize: '12px', color: '#ccc' }}>🇬🇧 UK's Most Trusted AI-Powered Network</span>
          <span style={{ fontSize: '12px', color: '#ccc' }}>Customer Service: 0800 123 4567</span>
        </div>
      </div>

      <div className={styles.mainNav}>
        <div className={styles.navInner}>
          <Link to="/store" className={styles.logo}>
            <span className={styles.logoIcon}>wx</span>
            <div className={styles.logoText}>
              <span className={styles.logoIBM}>IBM</span>
              <span className={styles.logoWatson}>WatsonX</span>
            </div>
          </Link>

          <div className={styles.desktopLinks}>
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className={`${styles.navLink} ${location.pathname === '/store' ? styles.active : ''}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.actions}>
            <Link to="/checkout" className={styles.cartBtn} aria-label="Shopping basket">
              <ShoppingCart size={22} />
              {totalItems > 0 && <span className={styles.cartBadge}>{totalItems > 9 ? '9+' : totalItems}</span>}
            </Link>

            {user && (
              <div ref={userRef} className={styles.userMenu}>
                <button className={styles.userBtn} onClick={() => setUserMenuOpen((v) => !v)} aria-expanded={userMenuOpen}>
                  <div className={styles.avatar}>{user.firstName[0]}{user.lastName[0]}</div>
                  <span className={styles.userName}>{user.firstName}</span>
                  <ChevronDown size={14} className={userMenuOpen ? styles.chevronUp : ''} />
                </button>
                {userMenuOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownHeader}>
                      <strong>{user.firstName} {user.lastName}</strong>
                      <span>{user.email}</span>
                    </div>
                    <button className={styles.dropdownItem} onClick={handleLogout}>
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            )}

            <button className={styles.hamburger} onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
              {link.icon} {link.label}
            </Link>
          ))}
          <button className={styles.mobileLogout} onClick={handleLogout}>
            <LogOut size={15} /> Sign out
          </button>
        </div>
      )}
    </nav>
  );
}
