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
          Grandma Rina's Recipes
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/recipes" className={styles.navLink}>Recipes</Link>

          {user ? (
            <>
              <Link to="/favorites" className={styles.navLink}>My Favorites</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className={styles.navLink}>Admin</Link>
              )}
              <span className={styles.userName}>Hello, {user.fullName}</span>
              <button onClick={handleLogout} className="btn btn-ghost">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>Login</Link>
              <Link to="/register" className="btn btn-light">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
