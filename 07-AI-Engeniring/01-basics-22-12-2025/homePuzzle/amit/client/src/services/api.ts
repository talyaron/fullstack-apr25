import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('stationZeroToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('stationZeroToken');
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
    );
  }

  async checkUser(username: string) {
    const response = await this.api.post('/auth/check-user', { username });
    return response.data;
  }

  async getCurrentUser() {
    const response = await this.api.get('/auth/me');
    return response.data;
  }

  // Puzzle API methods
  async getPuzzleById(puzzleId: string) {
    const response = await this.api.get(`/puzzles/${puzzleId}`);
    return response.data;
  }

  async getPuzzlesByRoom(roomId: string) {
    const response = await this.api.get(`/puzzles/room/${roomId}`);
    return response.data;
  }

  async verifyPuzzleSolution(puzzleId: string, code: string) {
    const response = await this.api.post('/puzzles/verify', { puzzleId, code });
    return response.data;
  }

  async get(url: string, config?: AxiosRequestConfig) {
    const response = await this.api.get(url, config);
    return response.data;
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.api.post(url, data, config);
    return response.data;
  }

  async put(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.api.put(url, data, config);
    return response.data;
  }

  async delete(url: string, config?: AxiosRequestConfig) {
    const response = await this.api.delete(url, config);
    return response.data;
  }
}

export default new ApiService();
