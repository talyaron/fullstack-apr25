import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCategories } from '../../store/recipeSlice';
import styles from './Home.module.scss';

const categoryImages: Record<string, string> = {
  'Appetizers': 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&h=300&fit=crop',
  'Main Dishes': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
  'Main Courses': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
  'Desserts': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
  'Soups': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
  'Salads': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  'Beverages': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
  'Breakfast': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop',
  'Snacks': 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=300&fit=crop',
  'Side Dishes': 'https://images.unsplash.com/photo-1534938665420-4193effeacc4?w=400&h=300&fit=crop',
  'Baked goods': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
  'Healthy & Tasty': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
};

const defaultImage = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categories, isLoading } = useAppSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category: string) => {
    navigate(`/recipes?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Grandma's Recipes</h1>
        <p className={styles.heroSubtitle}>flavors from home</p>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Explore Categories</h2>

        {isLoading ? (
          <div className="loading"></div>
        ) : (
          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <button
                key={category}
                className={styles.categoryCard}
                onClick={() => handleCategoryClick(category)}
              >
                <div className={styles.categoryImage}>
                  <img
                    src={categoryImages[category] || defaultImage}
                    alt={category}
                  />
                </div>
                <h3 className={styles.categoryName}>{category}</h3>
              </button>
            ))}
          </div>
        )}

        <div className={styles.viewAllWrapper}>
          <Link to="/recipes" className={styles.viewAllButton}>
            View All Recipes
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
