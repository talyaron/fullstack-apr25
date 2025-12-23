import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleFavorite } from '../../store/recipeSlice';
import { updateFavorites } from '../../store/authSlice';
import type { Recipe } from '../../types';
import styles from './RecipeCard.module.scss';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const isFavorite = user?.favorites?.includes(recipe._id) || false;

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate('/login');
      return;
    }

    const result = await dispatch(toggleFavorite(recipe._id));
    if (toggleFavorite.fulfilled.match(result)) {
      dispatch(updateFavorites({ recipeId: recipe._id, isFavorite: result.payload.isFavorite }));
    }
  };
  const getDifficultyText = (difficulty: number) => {
    const levels = ['', 'Very Easy', 'Easy', 'Medium', 'Challenging', 'Hard'];
    return levels[difficulty] || '';
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.starFilled : styles.star}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Link to={`/recipe/${recipe._id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.title} />
        ) : (
          <div className={styles.placeholder}>
            <span>🍽️</span>
          </div>
        )}
        <span className={styles.category}>{recipe.category}</span>
        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.favorited : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{recipe.title}</h3>

        <div className={styles.meta}>
          <span className={styles.time}>⏱️ {recipe.prepTime} min</span>
          <span className={styles.difficulty}>
            📊 {getDifficultyText(recipe.difficulty)}
          </span>
        </div>

        <div className={styles.rating}>
          {renderStars(Math.round(recipe.averageRating))}
          <span className={styles.ratingValue}>
            ({recipe.averageRating.toFixed(1)})
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
