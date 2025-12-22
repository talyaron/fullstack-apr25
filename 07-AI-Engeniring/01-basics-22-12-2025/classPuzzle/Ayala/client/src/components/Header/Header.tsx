import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/authSlice';
import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          המתכונים של סבתא רינה
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>דף הבית</Link>
          <Link to="/recipes" className={styles.navLink}>מתכונים</Link>

          {user ? (
            <>
              <Link to="/favorites" className={styles.navLink}>המועדפים שלי</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className={styles.navLink}>ניהול</Link>
              )}
              <span className={styles.userName}>שלום, {user.fullName}</span>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                התנתק
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>התחברות</Link>
              <Link to="/register" className={styles.registerBtn}>הרשמה</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
