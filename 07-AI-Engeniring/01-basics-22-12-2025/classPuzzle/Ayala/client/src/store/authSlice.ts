import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import type { AuthState, User } from '../types';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null
};

export const register = createAsyncThunk(
  'auth/register',
  async (data: { email: string; fullName: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', data);
      return response.data.user as User;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'שגיאה בהרשמה');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', data);
      return response.data.user as User;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'שגיאה בהתחברות');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'שגיאה בהתנתקות');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/me');
      return response.data.user as User;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'לא מחובר');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
