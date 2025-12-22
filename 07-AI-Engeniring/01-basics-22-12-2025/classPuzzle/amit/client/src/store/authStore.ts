import { create } from 'zustand';
import api from '../api/axios';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (username: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post('/auth/login', { username, password });
      set({ user: response.data.user, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Login failed',
        isLoading: false
      });
      throw error;
    }
  },

  register: async (username: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post('/auth/register', { username, password });
      set({ user: response.data.user, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Registration failed',
        isLoading: false
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      set({ user: null, error: null });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Logout failed' });
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get('/auth/me');
      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      set({ user: null, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
