import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRecipes, fetchCategories, setSearchQuery } from '../../store/recipeSlice';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Dropdown from '../../components/Dropdown/Dropdown';
import styles from './Recipes.module.scss';

const Recipes = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { recipes, categories, searchQuery, isLoading } = useAppSelector((state) => state.recipes);
  const lastSearchRef = useRef<string>('');

  const [filters, setFilters] = useState({
    category: '',
    sortBy: '' as '' | 'title' | 'rating' | 'prepTime',
    difficulty: '',
    maxTime: ''
  });

  // Initialize filters from URL params and fetch categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle search from header and category from URL
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || '';

    setFilters((prev) => ({
      ...prev,
      category: categoryFromUrl
    }));

    // Only fetch if searchQuery changed to a new value, or on initial load
    if (searchQuery && searchQuery !== lastSearchRef.current) {
      lastSearchRef.current = searchQuery;
      dispatch(fetchRecipes({
        category: categoryFromUrl || undefined,
        search: searchQuery
      }));
      dispatch(setSearchQuery(''));
    } else if (!lastSearchRef.current) {
      // Initial load without search
      dispatch(fetchRecipes({
        category: categoryFromUrl || undefined
      }));
      lastSearchRef.current = 'initialized';
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
      category: filters.category || undefined,
      sortBy: filters.sortBy || undefined,
      difficulty: filters.difficulty ? Number(filters.difficulty) : undefined,
      maxTime: filters.maxTime ? Number(filters.maxTime) : undefined
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      sortBy: '',
      difficulty: '',
      maxTime: ''
    });
    setSearchParams({});
    lastSearchRef.current = 'cleared';
    dispatch(fetchRecipes({}));
  };

  return (
    <div className={styles.recipesPage}>
      <h1>All Recipes</h1>

      <div className={styles.filtersSection}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label>Category</label>
            <Dropdown
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              placeholder="All"
              options={[
                { value: '', label: 'All' },
                ...categories.map((cat) => ({ value: cat, label: cat }))
              ]}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Sort By</label>
            <Dropdown
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              placeholder="Default"
              options={[
                { value: '', label: 'Default' },
                { value: 'title', label: 'A-Z' },
                { value: 'rating', label: 'Rating' },
                { value: 'prepTime', label: 'Prep Time' }
              ]}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Difficulty</label>
            <Dropdown
              name="difficulty"
              value={filters.difficulty}
              onChange={handleFilterChange}
              placeholder="All"
              options={[
                { value: '', label: 'All' },
                { value: '1', label: 'Very Easy' },
                { value: '2', label: 'Easy' },
                { value: '3', label: 'Medium' },
                { value: '4', label: 'Challenging' },
                { value: '5', label: 'Hard' }
              ]}
            />
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
