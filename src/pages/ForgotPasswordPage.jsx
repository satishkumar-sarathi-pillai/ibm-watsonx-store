import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import styles from './Auth.module.css';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Please enter your email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Enter a valid email address');
      return;
    }

    setEmailError('');
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setStep(2);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!newPassword) errs.password = 'Please enter a new password';
    else if (newPassword.length < 8) errs.password = 'Password must be at least 8 characters';
    if (!confirm) errs.confirm = 'Please confirm your password';
    else if (newPassword !== confirm) errs.confirm = 'Passwords do not match';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const result = resetPassword(email, newPassword);
    setLoading(false);

    if (result.success) {
      setStep(3);
      toast.success('Password reset successfully!');
    } else {
      toast.error(result.message);
      setErrors({ general: result.message });
    }
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
            <div className={styles.heroBadge}>🔐 Account Security</div>
            <h1 className={styles.heroTitle}>Reset your password</h1>
            <p className={styles.heroSubtitle}>We'll help you reset your password and get back into your IBM WatsonX account quickly.</p>
          </div>

          <div className={styles.stepIndicator}>
            {['Verify email', 'New password', 'Complete'].map((label, index) => (
              <div key={label} className={`${styles.stepItem} ${step > index ? styles.stepDone : ''} ${step === index + 1 ? styles.stepActive : ''}`}>
                <div className={styles.stepDot}>{step > index + 1 ? '✓' : index + 1}</div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <Link to="/login" className={styles.backLink}><ArrowLeft size={16} /> Back to sign in</Link>

          {step === 1 && (
            <>
              <div className={styles.formHeader}>
                <h2>Forgot password?</h2>
                <p>Enter your email address and we'll verify your account.</p>
              </div>

              <form onSubmit={handleEmailSubmit} className={styles.form} noValidate>
                <div className={styles.field}>
                  <label htmlFor="email">Email address</label>
                  <div className={`${styles.inputWrap} ${emailError ? styles.inputError : ''}`}>
                    <Mail size={18} className={styles.inputIcon} />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                      autoComplete="email"
                    />
                  </div>
                  {emailError && <span className={styles.fieldError}>{emailError}</span>}
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? <span className={styles.btnSpinner} /> : <><ArrowRight size={18} /> Continue</>}
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <div className={styles.formHeader}>
                <h2>Create new password</h2>
                <p>Enter a new password for <strong>{email}</strong></p>
              </div>

              {errors.general && <div className={styles.errorAlert}>{errors.general}</div>}

              <form onSubmit={handleReset} className={styles.form} noValidate>
                <div className={styles.field}>
                  <label htmlFor="newpass">New password</label>
                  <div className={`${styles.inputWrap} ${errors.password ? styles.inputError : ''}`}>
                    <Lock size={18} className={styles.inputIcon} />
                    <input
                      id="newpass"
                      type={showPass ? 'text' : 'password'}
                      placeholder="Minimum 8 characters"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setErrors((er) => ({ ...er, password: '' }));
                      }}
                    />
                    <button type="button" className={styles.eyeBtn} onClick={() => setShowPass((v) => !v)} tabIndex={-1}>
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="confirm">Confirm new password</label>
                  <div className={`${styles.inputWrap} ${errors.confirm ? styles.inputError : ''}`}>
                    <Lock size={18} className={styles.inputIcon} />
                    <input id="confirm" type="password" placeholder="Re-enter password" value={confirm} onChange={(e) => { setConfirm(e.target.value); setErrors((er) => ({ ...er, confirm: '' })); }} />
                  </div>
                  {errors.confirm && <span className={styles.fieldError}>{errors.confirm}</span>}
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? <span className={styles.btnSpinner} /> : <><ArrowRight size={18} /> Reset password</>}
                </button>
              </form>
            </>
          )}

          {step === 3 && (
            <div className={styles.successState}>
              <div className={styles.successIcon}><CheckCircle size={48} /></div>
              <h2>Password reset!</h2>
              <p>Your password has been successfully reset. You can now sign in with your new password.</p>
              <button className={styles.submitBtn} onClick={() => navigate('/login')}><ArrowRight size={18} /> Sign in now</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
