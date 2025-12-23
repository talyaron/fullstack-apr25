import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRecipes, createRecipe, updateRecipe, deleteRecipe } from '../../store/recipeSlice';
import type { Recipe } from '../../types';
import styles from './RecipeManagement.module.scss';

const RecipeManagement = () => {
  const dispatch = useAppDispatch();
  const { recipes, isLoading } = useAppSelector((state) => state.recipes);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    difficulty: '1',
    imageUrl: ''
  });

  useEffect(() => {
    dispatch(fetchRecipes({}));
  }, [dispatch]);

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      ingredients: '',
      instructions: '',
      prepTime: '',
      difficulty: '1',
      imageUrl: ''
    });
    setEditingRecipe(null);
    setIsFormOpen(false);
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setFormData({
      title: recipe.title,
      category: recipe.category,
      ingredients: recipe.ingredients.join('\n'),
      instructions: recipe.instructions.join('\n'),
      prepTime: recipe.prepTime.toString(),
      difficulty: recipe.difficulty.toString(),
      imageUrl: recipe.imageUrl || ''
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      await dispatch(deleteRecipe(id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const recipeData = {
      title: formData.title,
      category: formData.category,
      ingredients: formData.ingredients.split('\n').filter(i => i.trim()),
      instructions: formData.instructions.split('\n').filter(i => i.trim()),
      prepTime: Number(formData.prepTime),
      difficulty: Number(formData.difficulty),
      imageUrl: formData.imageUrl
    };

    if (editingRecipe) {
      await dispatch(updateRecipe({ id: editingRecipe._id, data: recipeData }));
    } else {
      await dispatch(createRecipe(recipeData));
    }

    resetForm();
  };

  return (
    <div className={styles.recipeManagement}>
      <div className={styles.header}>
        <h2>Manage Recipes ({recipes.length})</h2>
        <button
          className="btn btn-primary"
          onClick={() => setIsFormOpen(true)}
        >
          + Add New Recipe
        </button>
      </div>

      {isFormOpen && (
        <div className={styles.formOverlay}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3>{editingRecipe ? 'Edit Recipe' : 'New Recipe'}</h3>

            <div className="form-group">
              <label>Recipe Name</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Desserts, Soups, Main Courses..."
                required
              />
            </div>

            <div className={styles.row}>
              <div className="form-group">
                <label>Prep Time (minutes)</label>
                <input
                  type="number"
                  value={formData.prepTime}
                  onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                >
                  <option value="1">Very Easy</option>
                  <option value="2">Easy</option>
                  <option value="3">Medium</option>
                  <option value="4">Challenging</option>
                  <option value="5">Hard</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Ingredients (one per line)</label>
              <textarea
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                rows={5}
                required
              />
            </div>

            <div className="form-group">
              <label>Instructions (one step per line)</label>
              <textarea
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                rows={5}
                required
              />
            </div>

            <div className="form-group">
              <label>Image URL (optional)</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className="btn btn-primary">
                {editingRecipe ? 'Update' : 'Create Recipe'}
              </button>
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Recipe Name</th>
              <th>Category</th>
              <th>Time</th>
              <th>Difficulty</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td>{recipe.title}</td>
                <td>{recipe.category}</td>
                <td>{recipe.prepTime} min</td>
                <td>{recipe.difficulty}/5</td>
                <td>⭐ {recipe.averageRating.toFixed(1)}</td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(recipe)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(recipe._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecipeManagement;
