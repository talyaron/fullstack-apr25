import type { LoginResponse, RegisterData, User } from './types.js';

interface ApiConfig {
  baseURL: string;
  timeout: number;
}

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

class ApiManager {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  saveToken(token: string): void {
    localStorage.setItem('accessToken', token);
    console.log('✅ Token saved');
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  clearToken(): void {
    localStorage.removeItem('accessToken');
    console.log('🗑️ Token cleared');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { requiresAuth = false, headers = {}, ...restOptions } = options;

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(headers as Record<string, string>),
    };

    if (requiresAuth) {
      const token = this.getToken();
      if (!token) {
        throw new Error('אין אסימון התחברות');
      }
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    const url = `${this.config.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: requestHeaders,
      });

      if (!response.ok) {
        if (response.status === 401 && requiresAuth) {
          this.clearToken();
          window.location.href = '/index.html';
          throw new Error('פג תוקף ההתחברות. נא להתחבר מחדש.');
        }

        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `שגיאת שרת: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('❌ API Request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string, requiresAuth = false): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      requiresAuth,
    });
  }

  async post<T>(
    endpoint: string,
    data: any,
    requiresAuth = false
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      requiresAuth,
    });
  }

  async delete<T>(endpoint: string, requiresAuth = false): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      requiresAuth,
    });
  }

  // ===============================================
  // AUTH ENDPOINTS
  // ===============================================

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await this.post<LoginResponse>('/api/auth/login', {
      username,
      password,
    });

    if (response.accessToken) {
      this.saveToken(response.accessToken);
    }

    return response;
  }

  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await this.post<LoginResponse>('/api/auth/register', data);
    
    if (response.accessToken) {
      this.saveToken(response.accessToken);
    }
    
    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.post('/api/auth/logout', {}, true);
    } finally {
      this.clearToken();
      window.location.href = '/index.html';
    }
  }

  async refreshToken(): Promise<string> {
    const response = await this.post<LoginResponse>('/api/auth/refresh', {});
    if (response.accessToken) {
      this.saveToken(response.accessToken);
      return response.accessToken;
    }
    throw new Error('Failed to refresh token');
  }

  async getMe(): Promise<User> {
    return this.get<User>('/api/auth/me', true);
  }
}

const api = new ApiManager({
  baseURL: '',
  timeout: 10000,
});

export default api;