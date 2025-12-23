import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRecipes, fetchCategories } from '../../store/recipeSlice';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useAppDispatch();
  const { recipes, categories, isLoading } = useAppSelector((state) => state.recipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchRecipes({}));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchRecipes({ search: searchTerm, category: selectedCategory }));
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    dispatch(fetchRecipes({ category, search: searchTerm }));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    dispatch(fetchRecipes({}));
  };

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <h1>Welcome to Grandma Rina's Recipes</h1>
        <p>Traditional homemade recipes especially for you</p>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search recipe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      </section>

      <section className={styles.categories}>
        <h2>Categories</h2>
        <div className={styles.categoryList}>
          <button
            className={`btn-category ${!selectedCategory ? 'active' : ''}`}
            onClick={handleClearFilters}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`btn-category ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.recipes}>
        <div className={styles.recipesHeader}>
          <h2>Our Recipes</h2>
          <Link to="/recipes" className={styles.viewAll}>
            View all recipes
          </Link>
        </div>

        {isLoading ? (
          <div className="loading"></div>
        ) : recipes.length === 0 ? (
          <p className={styles.noRecipes}>No recipes found</p>
        ) : (
          <div className={styles.recipeGrid}>
            {recipes.slice(0, 6).map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
