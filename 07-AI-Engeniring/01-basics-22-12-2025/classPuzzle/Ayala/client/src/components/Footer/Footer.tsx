import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import potLogoSVG from './../../assets/pot_no_bg (4).svg'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.title}>Grandma's Recipes</h3>
          <p className={styles.description}>
            Flavors from home, made with love.
          </p>
          <img src={potLogoSVG} alt="Grandma's Recipes" />
        </div>

        <div className={styles.section}>
          <h4 className={styles.subtitle}>Quick Links</h4>
          <nav className={styles.links}>
            <Link to="/" onClick={scrollToTop}>Home</Link>
            <Link to="/recipes" onClick={scrollToTop}>Recipes</Link>
            <Link to="/favorites" onClick={scrollToTop}>Favorites</Link>
          </nav>
        </div>

        <div className={styles.section}>
          <h4 className={styles.subtitle}>Categories</h4>
          <nav className={styles.links}>
            <Link to="/recipes?category=Appetizers" onClick={scrollToTop}>Appetizers</Link>
            <Link to="/recipes?category=Main%20Dishes" onClick={scrollToTop}>Main Dishes</Link>
            <Link to="/recipes?category=Desserts" onClick={scrollToTop}>Desserts</Link>
          </nav>
        </div>

        <div className={styles.section}>
          <h4 className={styles.subtitle}>Account</h4>
          <nav className={styles.links}>
            <Link to="/login" onClick={scrollToTop}>Login</Link>
            <Link to="/register" onClick={scrollToTop}>Register</Link>
          </nav>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Grandma's Recipes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
