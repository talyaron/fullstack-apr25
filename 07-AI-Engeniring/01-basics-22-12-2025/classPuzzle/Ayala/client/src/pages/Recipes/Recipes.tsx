import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRecipes, fetchCategories, setSearchQuery } from '../../store/recipeSlice';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import styles from './Recipes.module.scss';

const Recipes = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { recipes, categories, searchQuery, isLoading } = useAppSelector((state) => state.recipes);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sortBy: '' as '' | 'title' | 'rating' | 'prepTime',
    difficulty: '',
    maxTime: ''
  });

  // Initialize filters from URL params and redux state
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || '';
    const searchFromRedux = searchQuery || '';

    setFilters((prev) => ({
      ...prev,
      category: categoryFromUrl,
      search: searchFromRedux
    }));

    dispatch(fetchCategories());
    dispatch(fetchRecipes({
      category: categoryFromUrl || undefined,
      search: searchFromRedux || undefined
    }));

    // Clear the search query from redux after using it
    if (searchFromRedux) {
      dispatch(setSearchQuery(''));
    }
  }, [dispatch, searchParams, searchQuery]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    // Update URL params
    const newParams = new URLSearchParams();
    if (filters.category) newParams.set('category', filters.category);
    setSearchParams(newParams);

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
    setSearchParams({});
    dispatch(fetchRecipes({}));
  };

  return (
    <div className={styles.recipesPage}>
      <h1>All Recipes</h1>

      <div className={styles.filtersSection}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label>Search</label>
            <input
              type="text"
              name="search"
              placeholder="Search recipe..."
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Category</label>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Sort By</label>
            <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
              <option value="">Default</option>
              <option value="title">A-Z</option>
              <option value="rating">Rating</option>
              <option value="prepTime">Prep Time</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Difficulty</label>
            <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="1">Very Easy</option>
              <option value="2">Easy</option>
              <option value="3">Medium</option>
              <option value="4">Challenging</option>
              <option value="5">Hard</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Max Time (minutes)</label>
            <input
              type="number"
              name="maxTime"
              placeholder="No limit"
              value={filters.maxTime}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className={styles.filterActions}>
          <button onClick={handleApplyFilters} className="btn btn-primary">
            Apply Filters
          </button>
          <button onClick={handleClearFilters} className="btn btn-outline">
            Clear Filters
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading"></div>
      ) : recipes.length === 0 ? (
        <p className={styles.noRecipes}>No recipes found</p>
      ) : (
        <>
          <p className={styles.resultsCount}>{recipes.length} recipes found</p>
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
