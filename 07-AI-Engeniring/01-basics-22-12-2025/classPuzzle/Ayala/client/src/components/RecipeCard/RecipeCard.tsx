import { Link } from 'react-router-dom';
import type { Recipe } from '../../types';
import styles from './RecipeCard.module.scss';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const getDifficultyText = (difficulty: number) => {
    const levels = ['', 'קל מאוד', 'קל', 'בינוני', 'מאתגר', 'קשה'];
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
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{recipe.title}</h3>

        <div className={styles.meta}>
          <span className={styles.time}>⏱️ {recipe.prepTime} דקות</span>
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
