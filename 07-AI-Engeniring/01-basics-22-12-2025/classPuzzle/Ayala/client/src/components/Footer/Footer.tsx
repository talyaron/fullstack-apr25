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
          <h3 className={styles.title}>המתכונים של סבתא</h3>
          <p className={styles.description}>
            טעמים מהבית, עשויים באהבה.
          </p>
          <img src={potLogoSVG} alt="המתכונים של סבתא" />
        </div>

        <div className={styles.section}>
          <h4 className={styles.subtitle}>קישורים מהירים</h4>
          <nav className={styles.links}>
            <Link to="/" onClick={scrollToTop}>דף הבית</Link>
            <Link to="/recipes" onClick={scrollToTop}>מתכונים</Link>
            <Link to="/favorites" onClick={scrollToTop}>מועדפים</Link>
          </nav>
        </div>

        <div className={styles.section}>
          <h4 className={styles.subtitle}>קטגוריות</h4>
          <nav className={styles.links}>
            <Link to="/recipes?category=Appetizers" onClick={scrollToTop}>מנות ראשונות</Link>
            <Link to="/recipes?category=Main%20Dishes" onClick={scrollToTop}>מנות עיקריות</Link>
            <Link to="/recipes?category=Desserts" onClick={scrollToTop}>קינוחים</Link>
          </nav>
        </div>

        <div className={styles.section}>
          <h4 className={styles.subtitle}>חשבון</h4>
          <nav className={styles.links}>
            <Link to="/login" onClick={scrollToTop}>התחברות</Link>
            <Link to="/register" onClick={scrollToTop}>הרשמה</Link>
          </nav>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} המתכונים של סבתא. כל הזכויות שמורות.</p>
      </div>
    </footer>
  );
};

export default Footer;
