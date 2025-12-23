import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.title}>Rina's Recipes</h3>
          <p className={styles.description}>
            Flavors from home, made with love.
          </p>
        </div>

        <div className={styles.section}>
          <h4 className={styles.subtitle}>Quick Links</h4>
          <nav className={styles.links}>
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/favorites">Favorites</Link>
          </nav>
        </div>

        <div className={styles.section}>
          <h4 className={styles.subtitle}>Categories</h4>
          <nav className={styles.links}>
            <Link to="/recipes?category=Appetizers">Appetizers</Link>
            <Link to="/recipes?category=Main Dishes">Main Dishes</Link>
            <Link to="/recipes?category=Desserts">Desserts</Link>
          </nav>
        </div>

        <div className={styles.section}>
          <h4 className={styles.subtitle}>Account</h4>
          <nav className={styles.links}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Rina's Recipes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
