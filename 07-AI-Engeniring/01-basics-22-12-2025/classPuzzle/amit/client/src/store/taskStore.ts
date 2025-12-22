import { create } from 'zustand';
import api from '../api/axios';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: (search?: string, priority?: string) => Promise<void>;
  createTask: (taskData: CreateTaskInput) => Promise<void>;
  updateTask: (id: string, taskData: UpdateTaskInput) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async (search?: string, priority?: string) => {
    try {
      set({ isLoading: true, error: null });
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (priority) params.append('priority', priority);

      const response = await api.get(`/tasks?${params.toString()}`);
      set({ tasks: response.data.tasks, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch tasks',
        isLoading: false
      });
    }
  },

  createTask: async (taskData: CreateTaskInput) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post('/tasks', taskData);
      set((state) => ({
        tasks: [...state.tasks, response.data.task],
        isLoading: false
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to create task',
        isLoading: false
      });
      throw error;
    }
  },

  updateTask: async (id: string, taskData: UpdateTaskInput) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.put(`/tasks/${id}`, taskData);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === id ? response.data.task : task
        ),
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update task',
        isLoading: false
      });
      throw error;
    }
  },

  deleteTask: async (id: string) => {
    try {
      set({ error: null });
      await api.delete(`/tasks/${id}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to delete task'
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
