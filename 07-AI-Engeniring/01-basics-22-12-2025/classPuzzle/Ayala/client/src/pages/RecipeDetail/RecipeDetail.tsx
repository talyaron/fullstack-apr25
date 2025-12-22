import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRecipeById, rateRecipe, toggleFavorite } from '../../store/recipeSlice';
import styles from './RecipeDetail.module.scss';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentRecipe, isLoading } = useAppSelector((state) => state.recipes);
  const { user } = useAppSelector((state) => state.auth);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeById(id));
    }
  }, [dispatch, id]);

  const getDifficultyText = (difficulty: number) => {
    const levels = ['', 'קל מאוד', 'קל', 'בינוני', 'מאתגר', 'קשה'];
    return levels[difficulty] || '';
  };

  const handleRate = async (rating: number) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setUserRating(rating);
    if (id) {
      await dispatch(rateRecipe({ id, rating }));
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (id) {
      await dispatch(toggleFavorite(id));
    }
  };

  const isFavorite = user?.favorites?.includes(id || '') || false;

  if (isLoading) {
    return <div className="loading"></div>;
  }

  if (!currentRecipe) {
    return <p className={styles.notFound}>המתכון לא נמצא</p>;
  }

  return (
    <div className={styles.recipeDetail}>
      <div className={styles.header}>
        <div className={styles.imageSection}>
          {currentRecipe.imageUrl ? (
            <img src={currentRecipe.imageUrl} alt={currentRecipe.title} />
          ) : (
            <div className={styles.placeholder}>
              <span>🍽️</span>
            </div>
          )}
        </div>

        <div className={styles.info}>
          <span className={styles.category}>{currentRecipe.category}</span>
          <h1>{currentRecipe.title}</h1>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.icon}>⏱️</span>
              <span>{currentRecipe.prepTime} דקות</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.icon}>📊</span>
              <span>{getDifficultyText(currentRecipe.difficulty)}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.icon}>⭐</span>
              <span>{currentRecipe.averageRating.toFixed(1)} ({currentRecipe.ratings.length} דירוגים)</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              onClick={handleToggleFavorite}
              className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
            >
              {isFavorite ? '❤️ במועדפים' : '🤍 הוסף למועדפים'}
            </button>
          </div>

          <div className={styles.ratingSection}>
            <span>דרג את המתכון:</span>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`${styles.star} ${(hoverRating || userRating) >= star ? styles.filled : ''}`}
                  onClick={() => handleRate(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.ingredients}>
          <h2>מצרכים</h2>
          <ul>
            {currentRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className={styles.instructions}>
          <h2>אופן הכנה</h2>
          <ol>
            {currentRecipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
