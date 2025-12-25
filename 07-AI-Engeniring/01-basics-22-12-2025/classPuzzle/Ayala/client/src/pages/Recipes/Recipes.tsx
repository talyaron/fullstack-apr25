import { useEffect, useState, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRecipes, fetchCategories, setSearchQuery } from '../../store/recipeSlice';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Dropdown from '../../components/Dropdown/Dropdown';
import type { KosherType } from '../../types';
import styles from './Recipes.module.scss';

const DIFFICULTY_LEVELS = [
  { value: '1', label: 'Very Easy' },
  { value: '2', label: 'Easy' },
  { value: '3', label: 'Medium' },
  { value: '4', label: 'Challenging' },
  { value: '5', label: 'Hard' }
];

const KOSHER_TYPES: KosherType[] = ['Parve', 'Dairy', 'Meat'];

// Dynamic background colors by category
const CATEGORY_BACKGROUNDS: Record<string, string> = {
  'Main Courses': '#F8BEF5',
  'Main Course': '#F8BEF5',
  'Side Dishes': '#FCFFCD',
  'Appetizers': '#D0FAFD',
  'Healthy & Tasty': '#AAF968',
  'Healthy Food': '#AAF968',
  'Desserts': '#E3CEB2',
  'Baked goods': '#FFCF90',
  'Salads': '#7DF98E',
  'Soups': '#FFAAAA',
};

// Special background for Yemeni food filter
const YEMENI_BACKGROUND = '#D4C7E0';

const Recipes = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { recipes, categories, searchQuery, isLoading } = useAppSelector((state) => state.recipes);
  const lastSearchRef = useRef<string>('');

  const [filters, setFilters] = useState({
    category: '',
    sortBy: '' as '' | 'title' | 'rating' | 'prepTime',
    difficulty: [] as string[],
    maxTime: '',
    isYemeni: false,
    kosherType: [] as KosherType[]
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

  const handleFilterChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDifficulty = (value: string) => {
    setFilters(prev => ({
      ...prev,
      difficulty: prev.difficulty.includes(value)
        ? prev.difficulty.filter(d => d !== value)
        : [...prev.difficulty, value]
    }));
  };

  const toggleKosherType = (type: KosherType) => {
    setFilters(prev => ({
      ...prev,
      kosherType: prev.kosherType.includes(type)
        ? prev.kosherType.filter(t => t !== type)
        : [...prev.kosherType, type]
    }));
  };

  const handleApplyFilters = () => {
    // Update URL params
    const newParams = new URLSearchParams();
    if (filters.category) newParams.set('category', filters.category);
    if (filters.isYemeni) newParams.set('yemeni', 'true');
    setSearchParams(newParams);

    dispatch(fetchRecipes({
      category: filters.category || undefined,
      sortBy: filters.sortBy || undefined,
      difficulty: filters.difficulty.length > 0 ? filters.difficulty.join(',') : undefined,
      maxTime: filters.maxTime ? Number(filters.maxTime) : undefined,
      isYemeni: filters.isYemeni || undefined,
      kosherType: filters.kosherType.length > 0 ? filters.kosherType.join(',') : undefined
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      sortBy: '',
      difficulty: [],
      maxTime: '',
      isYemeni: false,
      kosherType: []
    });
    setSearchParams({});
    lastSearchRef.current = 'cleared';
    dispatch(fetchRecipes({}));
  };

  // Calculate dynamic background color based on category or Yemeni filter
  const dynamicBackground = useMemo(() => {
    if (filters.isYemeni) {
      return YEMENI_BACKGROUND;
    }
    if (filters.category && CATEGORY_BACKGROUNDS[filters.category]) {
      return CATEGORY_BACKGROUNDS[filters.category];
    }
    return undefined;
  }, [filters.category, filters.isYemeni]);

  return (
    <div
      className={styles.recipesPage}
      style={dynamicBackground ? { backgroundColor: dynamicBackground, transition: 'background-color 0.3s ease' } : undefined}
    >
      <h1>All Recipes</h1>

      <div className={styles.pageLayout}>
        {/* Left Sidebar - Filters */}
        <aside className={styles.filtersSidebar}>
          <h3 className={styles.filtersTitle}>Filters</h3>

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
            <label>Max Time (minutes)</label>
            <input
              type="number"
              name="maxTime"
              placeholder="No limit"
              value={filters.maxTime}
              onChange={handleFilterChange}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Difficulty</label>
            <div className={styles.chipGroup}>
              {DIFFICULTY_LEVELS.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  className={`${styles.chip} ${filters.difficulty.includes(level.value) ? styles.active : ''}`}
                  onClick={() => toggleDifficulty(level.value)}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>Kosher Type</label>
            <div className={styles.kosherChips}>
              {KOSHER_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`${styles.kosherChip} ${styles[type.toLowerCase()]} ${filters.kosherType.includes(type) ? styles.active : ''}`}
                  onClick={() => toggleKosherType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>Special</label>
            <button
              type="button"
              className={`${styles.yemeniToggle} ${filters.isYemeni ? styles.active : ''}`}
              onClick={() => setFilters(prev => ({ ...prev, isYemeni: !prev.isYemeni }))}
            >
              {filters.isYemeni ? '✓' : ''} Yemeni Food
            </button>
          </div>

          <div className={styles.filterActions}>
            <button onClick={handleApplyFilters} className="btn btn-primary">
              Apply Filters
            </button>
            <button onClick={handleClearFilters} className="btn btn-outline">
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Right - Recipe Content */}
        <main className={styles.recipeContent}>
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
        </main>
      </div>
    </div>
  );
};

export default Recipes;
