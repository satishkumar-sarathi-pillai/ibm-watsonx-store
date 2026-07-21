import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import styles from './Auth.module.css';

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) navigate('/store', { replace: true });
  }, [user, navigate]);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Please enter your email address';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address';
    if (!form.password) e.password = 'Please enter your password';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const result = login(form.email, form.password);
    setLoading(false);

    if (result.success) {
      toast.success('Welcome back! 👋');
      navigate('/store');
    } else {
      toast.error(result.message);
      setErrors({ general: result.message });
    }
  };

  const handleDemoLogin = () => {
    setForm({ email: 'demo@watsonx.ibm.com', password: 'Demo1234!' });
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <Link to="/" className={styles.brandLogo}>
            <span className={styles.logoIcon}>wx</span>
            <div className={styles.logoText}>
              <span className={styles.logoIBM}>IBM</span>
              <span className={styles.logoWatson}>WatsonX</span>
            </div>
          </Link>

          <div className={styles.heroContent}>
            <div className={styles.heroBadge}><Zap size={14} /> AI-Powered Network</div>
            <h1 className={styles.heroTitle}>The smartest way to stay connected</h1>
            <p className={styles.heroSubtitle}>Explore the latest smartphones with exclusive IBM WatsonX deals. 5G network. Unlimited everything.</p>
          </div>

          <div className={styles.features}>
            {[
              { icon: '🏆', text: 'UK\'s #1 AI Network' },
              { icon: '⚡', text: '5G Ultra-fast speeds' },
              { icon: '🔒', text: 'Secure & reliable' }
            ].map((feature) => (
              <div key={feature.text} className={styles.featureItem}><span>{feature.icon}</span> {feature.text}</div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>Sign in</h2>
            <p>Welcome back. Enter your credentials to continue.</p>
          </div>

          {errors.general && <div className={styles.errorAlert}>{errors.general}</div>}

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="email">Email address</label>
              <div className={`${styles.inputWrap} ${errors.email ? styles.inputError : ''}`}>
                <Mail size={18} className={styles.inputIcon} />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  autoComplete="email"
                  onChange={(e) => {
                    setForm((f) => ({ ...f, email: e.target.value }));
                    setErrors((er) => ({ ...er, email: '' }));
                  }}
                />
              </div>
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <div className={styles.labelRow}>
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
              </div>
              <div className={`${styles.inputWrap} ${errors.password ? styles.inputError : ''}`}>
                <Lock size={18} className={styles.inputIcon} />
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  autoComplete="current-password"
                  onChange={(e) => {
                    setForm((f) => ({ ...f, password: e.target.value }));
                    setErrors((er) => ({ ...er, password: '' }));
                  }}
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPass((v) => !v)} tabIndex={-1}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className={styles.btnSpinner} /> : <><ArrowRight size={18} /> Login</>}
            </button>
          </form>

          <button className={styles.demoBtn} onClick={handleDemoLogin}>Use demo account</button>

          <p className={styles.switchText}>
            Don't have an account? <Link to="/register" className={styles.switchLink}>Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
