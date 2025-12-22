import { Request, Response } from 'express';
import { Recipe } from '../models/Recipe';
import { User } from '../models/User';

export const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, sortBy, minTime, maxTime, difficulty } = req.query;

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (minTime || maxTime) {
      query.prepTime = {};
      if (minTime) query.prepTime.$gte = Number(minTime);
      if (maxTime) query.prepTime.$lte = Number(maxTime);
    }

    if (difficulty) {
      query.difficulty = Number(difficulty);
    }

    let sortOption: any = { createdAt: -1 };
    if (sortBy === 'title') {
      sortOption = { title: 1 };
    } else if (sortBy === 'rating') {
      sortOption = { averageRating: -1 };
    } else if (sortBy === 'prepTime') {
      sortOption = { prepTime: 1 };
    }

    const recipes = await Recipe.find(query).sort(sortOption);
    res.json(recipes);
  } catch (error) {
    console.error('Get all recipes error:', error);
    res.status(500).json({ message: 'שגיאה בטעינת המתכונים' });
  }
};

export const getRecipeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      res.status(404).json({ message: 'המתכון לא נמצא' });
      return;
    }
    res.json(recipe);
  } catch (error) {
    console.error('Get recipe by id error:', error);
    res.status(500).json({ message: 'שגיאה בטעינת המתכון' });
  }
};

export const createRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category, ingredients, instructions, prepTime, difficulty, imageUrl } = req.body;

    const recipe = new Recipe({
      title,
      category,
      ingredients,
      instructions,
      prepTime,
      difficulty,
      imageUrl
    });

    await recipe.save();
    res.status(201).json({ message: 'המתכון נוצר בהצלחה', recipe });
  } catch (error) {
    console.error('Create recipe error:', error);
    res.status(500).json({ message: 'שגיאה ביצירת המתכון' });
  }
};

export const updateRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category, ingredients, instructions, prepTime, difficulty, imageUrl } = req.body;

    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { title, category, ingredients, instructions, prepTime, difficulty, imageUrl },
      { new: true, runValidators: true }
    );

    if (!recipe) {
      res.status(404).json({ message: 'המתכון לא נמצא' });
      return;
    }

    res.json({ message: 'המתכון עודכן בהצלחה', recipe });
  } catch (error) {
    console.error('Update recipe error:', error);
    res.status(500).json({ message: 'שגיאה בעדכון המתכון' });
  }
};

export const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      res.status(404).json({ message: 'המתכון לא נמצא' });
      return;
    }
    res.json({ message: 'המתכון נמחק בהצלחה' });
  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({ message: 'שגיאה במחיקת המתכון' });
  }
};

export const rateRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.cookies.userId;
    if (!userId) {
      res.status(401).json({ message: 'יש להתחבר כדי לדרג' });
      return;
    }

    const { rating } = req.body;
    if (rating < 0 || rating > 5) {
      res.status(400).json({ message: 'דירוג חייב להיות בין 0 ל-5' });
      return;
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      res.status(404).json({ message: 'המתכון לא נמצא' });
      return;
    }

    const existingRatingIndex = recipe.ratings.findIndex(
      r => r.userId.toString() === userId
    );

    if (existingRatingIndex > -1) {
      recipe.ratings[existingRatingIndex].rating = rating;
    } else {
      recipe.ratings.push({ userId, rating });
    }

    await recipe.save();
    res.json({ message: 'הדירוג נשמר בהצלחה', averageRating: recipe.averageRating });
  } catch (error) {
    console.error('Rate recipe error:', error);
    res.status(500).json({ message: 'שגיאה בשמירת הדירוג' });
  }
};

export const toggleFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.cookies.userId;
    if (!userId) {
      res.status(401).json({ message: 'יש להתחבר כדי להוסיף למועדפים' });
      return;
    }

    const recipeId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'משתמש לא נמצא' });
      return;
    }

    const favoriteIndex = user.favorites.findIndex(
      f => f.toString() === recipeId
    );

    if (favoriteIndex > -1) {
      user.favorites.splice(favoriteIndex, 1);
      await user.save();
      res.json({ message: 'הוסר מהמועדפים', isFavorite: false });
    } else {
      user.favorites.push(recipeId as any);
      await user.save();
      res.json({ message: 'נוסף למועדפים', isFavorite: true });
    }
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({ message: 'שגיאה בעדכון המועדפים' });
  }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Recipe.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'שגיאה בטעינת הקטגוריות' });
  }
};
