import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Home, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import styles from './OrderConfirmPage.module.css';

export default function OrderConfirmPage() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.iconWrap}><CheckCircle2 size={48} /></div>
          <h1>Thank you</h1>
          <p>Your new phone plan is on the way. We’ll send a confirmation to {order?.email || 'your inbox'} shortly.</p>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Delivery to</span>
              <strong>{order?.fullName || 'You'}</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Address</span>
              <strong>{order?.address || 'Not provided'}</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Monthly total</span>
              <strong>£{order?.subtotal || 0}</strong>
            </div>
          </div>

          <div className={styles.highlights}>
            <span><Sparkles size={14} /> AI-powered setup included</span>
            <span><Sparkles size={14} /> Free next-day delivery</span>
          </div>

          <div className={styles.actions}>
            <Link to="/store" className={styles.primaryBtn}><Home size={16} /> Back to store</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
