export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'user';
  favorites: string[];
}

export interface Rating {
  userId: string;
  rating: number;
}

export interface Recipe {
  _id: string;
  title: string;
  category: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  difficulty: number;
  ratings: Rating[];
  averageRating: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface RecipeState {
  recipes: Recipe[];
  currentRecipe: Recipe | null;
  categories: string[];
  isLoading: boolean;
  error: string | null;
}

export interface RecipeFilters {
  category?: string;
  search?: string;
  sortBy?: 'title' | 'rating' | 'prepTime';
  minTime?: number;
  maxTime?: number;
  difficulty?: number;
}
