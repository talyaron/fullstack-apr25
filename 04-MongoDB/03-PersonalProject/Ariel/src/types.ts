// src/types.ts - Shared types for the application

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  addedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  cart: CartItem[];
  createdAt: string;
  lastLogin?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface PasswordStrength {
  level: 'weak' | 'medium' | 'strong';
  text: string;
}