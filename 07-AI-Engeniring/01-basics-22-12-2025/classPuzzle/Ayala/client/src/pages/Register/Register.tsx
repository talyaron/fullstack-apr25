import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { register, clearError } from '../../store/authSlice';
import styles from './Register.module.scss';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) dispatch(clearError());
    if (validationError) setValidationError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setValidationError('הסיסמאות אינן תואמות');
      return;
    }

    if (formData.password.length < 6) {
      setValidationError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return;
    }

    const result = await dispatch(register({
      email: formData.email,
      fullName: formData.fullName,
      password: formData.password
    }));

    if (register.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.card}>
        <h1 className={styles.title}>הרשמה</h1>
        <p className={styles.subtitle}>הצטרפו למשפחת המתכונים של סבתא רינה</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="form-group">
            <label htmlFor="fullName">שם מלא</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="הכנס שם מלא"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">אימייל</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="הכנס אימייל"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">סיסמה</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="הכנס סיסמה"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">אימות סיסמה</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="הכנס סיסמה שוב"
              required
            />
          </div>

          {(error || validationError) && (
            <p className="error-message">{error || validationError}</p>
          )}

          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'נרשם...' : 'הרשם'}
          </button>
        </form>

        <p className={styles.loginLink}>
          כבר יש לך חשבון? <Link to="/login">התחבר</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
