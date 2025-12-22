import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import api from '../../services/api';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import type { Recipe } from '../../types';
import styles from './Favorites.module.scss';

const Favorites = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await api.get('/users/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.favoritesPage}>
      <h1>המועדפים שלי</h1>

      {isLoading ? (
        <div className="loading"></div>
      ) : favorites.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.icon}>💔</span>
          <p>עדיין לא הוספת מתכונים למועדפים</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/recipes')}
          >
            גלה מתכונים
          </button>
        </div>
      ) : (
        <>
          <p className={styles.count}>{favorites.length} מתכונים במועדפים</p>
          <div className={styles.grid}>
            {favorites.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
