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
    if (window.confirm('האם אתה בטוח שברצונך למחוק את המתכון?')) {
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
        <h2>ניהול מתכונים ({recipes.length})</h2>
        <button
          className="btn btn-primary"
          onClick={() => setIsFormOpen(true)}
        >
          + הוסף מתכון חדש
        </button>
      </div>

      {isFormOpen && (
        <div className={styles.formOverlay}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3>{editingRecipe ? 'עריכת מתכון' : 'מתכון חדש'}</h3>

            <div className="form-group">
              <label>שם המתכון</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>קטגוריה</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="קינוחים, מרקים, מנות עיקריות..."
                required
              />
            </div>

            <div className={styles.row}>
              <div className="form-group">
                <label>זמן הכנה (דקות)</label>
                <input
                  type="number"
                  value={formData.prepTime}
                  onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>רמת קושי</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                >
                  <option value="1">קל מאוד</option>
                  <option value="2">קל</option>
                  <option value="3">בינוני</option>
                  <option value="4">מאתגר</option>
                  <option value="5">קשה</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>מצרכים (כל מצרך בשורה נפרדת)</label>
              <textarea
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                rows={5}
                required
              />
            </div>

            <div className="form-group">
              <label>הוראות הכנה (כל שלב בשורה נפרדת)</label>
              <textarea
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                rows={5}
                required
              />
            </div>

            <div className="form-group">
              <label>קישור לתמונה (אופציונלי)</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className="btn btn-primary">
                {editingRecipe ? 'עדכן' : 'צור מתכון'}
              </button>
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                ביטול
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
              <th>שם המתכון</th>
              <th>קטגוריה</th>
              <th>זמן</th>
              <th>קושי</th>
              <th>דירוג</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td>{recipe.title}</td>
                <td>{recipe.category}</td>
                <td>{recipe.prepTime} דק׳</td>
                <td>{recipe.difficulty}/5</td>
                <td>⭐ {recipe.averageRating.toFixed(1)}</td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(recipe)}
                    >
                      ערוך
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(recipe._id)}
                    >
                      מחק
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
