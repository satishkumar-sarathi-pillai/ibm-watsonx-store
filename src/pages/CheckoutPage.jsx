import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
    email: user?.email || '',
    address: '',
    postcode: '',
    card: '4242 4242 4242 4242'
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearCart();
    navigate('/order-confirm', { state: { order: { ...form, items, subtotal } } });
  };

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.emptyState}>
          <ShoppingBag size={40} />
          <h2>Your basket is empty</h2>
          <p>Add a phone and plan to continue to checkout.</p>
          <Link to="/store" className={styles.primaryLink}>Browse phones</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.wrapper}>
        <Link to="/store" className={styles.backLink}><ArrowLeft size={16} /> Return to store</Link>
        <div className={styles.layout}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.card}>
              <h2>Delivery details</h2>
              <div className={styles.grid}>
                <label>
                  <span>Full name</span>
                  <input name="fullName" value={form.fullName} onChange={handleChange} required />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </label>
                <label>
                  <span>Address</span>
                  <input name="address" value={form.address} onChange={handleChange} required />
                </label>
                <label>
                  <span>Postcode</span>
                  <input name="postcode" value={form.postcode} onChange={handleChange} required />
                </label>
              </div>
            </div>

            <div className={styles.card}>
              <h2>Payment</h2>
              <label>
                <span>Card number</span>
                <div className={styles.cardInput}>
                  <CreditCard size={16} />
                  <input name="card" value={form.card} onChange={handleChange} required />
                </div>
              </label>
              <div className={styles.paymentMeta}>
                <span><Shield size={14} /> Secure checkout</span>
                <span><Truck size={14} /> Free delivery</span>
              </div>
            </div>

            <button className={styles.submitBtn} type="submit">Place order</button>
          </form>

          <aside className={styles.summary}>
            <div className={styles.card}>
              <h3>Basket summary</h3>
              {items.map((item) => (
                <div key={item.key} className={styles.lineItem}>
                  <div>
                    <strong>{item.product.name}</strong>
                    <p>{item.plan.name}</p>
                  </div>
                  <span>£{item.plan.monthlyPrice}/mo</span>
                </div>
              ))}
              <div className={styles.totalRow}>
                <span>Estimated monthly total</span>
                <strong>£{subtotal}</strong>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
