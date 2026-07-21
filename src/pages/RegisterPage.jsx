import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import styles from './Auth.module.css';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const rules = [
    { label: 'At least 8 characters', test: (v) => v.length >= 8 },
    { label: 'One uppercase letter', test: (v) => /[A-Z]/.test(v) },
    { label: 'One number', test: (v) => /\d/.test(v) },
    { label: 'One special character', test: (v) => /[!@#$%^&*]/.test(v) }
  ];

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!form.email) e.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.password) e.password = 'Password is required';
    else if (rules.some((rule) => !rule.test(form.password))) e.password = 'Password does not meet requirements';
    if (!form.confirm) e.confirm = 'Please confirm your password';
    else if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
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
    const result = register(form);
    setLoading(false);

    if (result.success) {
      toast.success('Account created! Please sign in.');
      navigate('/store');
    } else {
      toast.error(result.message);
      setErrors({ general: result.message });
    }
  };

  const setInput = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: '' }));
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
            <div className={styles.heroBadge}>✨ New Account</div>
            <h1 className={styles.heroTitle}>Join IBM WatsonX today</h1>
            <p className={styles.heroSubtitle}>Create your account and unlock exclusive deals on the latest smartphones with our AI-powered network.</p>
          </div>

          <div className={styles.features}>
            {[
              { icon: '🎁', text: 'Exclusive member deals' },
              { icon: '📦', text: 'Free next-day delivery' },
              { icon: '💬', text: '24/7 AI support' }
            ].map((feature) => (
              <div key={feature.text} className={styles.featureItem}><span>{feature.icon}</span> {feature.text}</div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>Create account</h2>
            <p>Fill in your details to get started.</p>
          </div>

          {errors.general && <div className={styles.errorAlert}>{errors.general}</div>}

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="firstName">First name</label>
                <div className={`${styles.inputWrap} ${errors.firstName ? styles.inputError : ''}`}>
                  <User size={18} className={styles.inputIcon} />
                  <input id="firstName" type="text" placeholder="John" value={form.firstName} onChange={setInput('firstName')} autoComplete="given-name" />
                </div>
                {errors.firstName && <span className={styles.fieldError}>{errors.firstName}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="lastName">Last name</label>
                <div className={`${styles.inputWrap} ${errors.lastName ? styles.inputError : ''}`}>
                  <User size={18} className={styles.inputIcon} />
                  <input id="lastName" type="text" placeholder="Smith" value={form.lastName} onChange={setInput('lastName')} autoComplete="family-name" />
                </div>
                {errors.lastName && <span className={styles.fieldError}>{errors.lastName}</span>}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email address</label>
              <div className={`${styles.inputWrap} ${errors.email ? styles.inputError : ''}`}>
                <Mail size={18} className={styles.inputIcon} />
                <input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={setInput('email')} autoComplete="email" />
              </div>
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <div className={`${styles.inputWrap} ${errors.password ? styles.inputError : ''}`}>
                <Lock size={18} className={styles.inputIcon} />
                <input id="password" type={showPass ? 'text' : 'password'} placeholder="Create a strong password" value={form.password} onChange={setInput('password')} autoComplete="new-password" />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPass((v) => !v)} tabIndex={-1}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
              {form.password && (
                <div className={styles.passwordRules}>
                  {rules.map((rule) => (
                    <div key={rule.label} className={`${styles.rule} ${rule.test(form.password) ? styles.rulePassed : ''}`}>
                      <CheckCircle2 size={12} /> {rule.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="confirm">Confirm password</label>
              <div className={`${styles.inputWrap} ${errors.confirm ? styles.inputError : ''}`}>
                <Lock size={18} className={styles.inputIcon} />
                <input id="confirm" type="password" placeholder="Re-enter your password" value={form.confirm} onChange={setInput('confirm')} autoComplete="new-password" />
              </div>
              {errors.confirm && <span className={styles.fieldError}>{errors.confirm}</span>}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className={styles.btnSpinner} /> : <><ArrowRight size={18} /> Create account</>}
            </button>
          </form>

          <p className={styles.switchText}>
            Already have an account? <Link to="/login" className={styles.switchLink}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
