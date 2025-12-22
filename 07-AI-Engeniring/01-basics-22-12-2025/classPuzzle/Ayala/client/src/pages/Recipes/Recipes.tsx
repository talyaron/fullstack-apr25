import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRecipes, fetchCategories } from '../../store/recipeSlice';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import styles from './Recipes.module.scss';

const Recipes = () => {
  const dispatch = useAppDispatch();
  const { recipes, categories, isLoading } = useAppSelector((state) => state.recipes);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sortBy: '' as '' | 'title' | 'rating' | 'prepTime',
    difficulty: '',
    maxTime: ''
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchRecipes({}));
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    dispatch(fetchRecipes({
      search: filters.search || undefined,
      category: filters.category || undefined,
      sortBy: filters.sortBy || undefined,
      difficulty: filters.difficulty ? Number(filters.difficulty) : undefined,
      maxTime: filters.maxTime ? Number(filters.maxTime) : undefined
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      sortBy: '',
      difficulty: '',
      maxTime: ''
    });
    dispatch(fetchRecipes({}));
  };

  return (
    <div className={styles.recipesPage}>
      <h1>כל המתכונים</h1>

      <div className={styles.filtersSection}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label>חיפוש</label>
            <input
              type="text"
              name="search"
              placeholder="חפש מתכון..."
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>קטגוריה</label>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">הכל</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>מיון</label>
            <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
              <option value="">ברירת מחדל</option>
              <option value="title">א-ב</option>
              <option value="rating">דירוג</option>
              <option value="prepTime">זמן הכנה</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>רמת קושי</label>
            <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
              <option value="">הכל</option>
              <option value="1">קל מאוד</option>
              <option value="2">קל</option>
              <option value="3">בינוני</option>
              <option value="4">מאתגר</option>
              <option value="5">קשה</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>זמן מקסימלי (דקות)</label>
            <input
              type="number"
              name="maxTime"
              placeholder="ללא הגבלה"
              value={filters.maxTime}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className={styles.filterActions}>
          <button onClick={handleApplyFilters} className="btn btn-primary">
            החל סינון
          </button>
          <button onClick={handleClearFilters} className="btn btn-outline">
            נקה סינון
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading"></div>
      ) : recipes.length === 0 ? (
        <p className={styles.noRecipes}>לא נמצאו מתכונים</p>
      ) : (
        <>
          <p className={styles.resultsCount}>{recipes.length} מתכונים נמצאו</p>
          <div className={styles.recipeGrid}>
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Recipes;
