// ===============================================
// TYPE DEFINITIONS
// ===============================================

export interface User {
  _id: string;
  username: string;
  email?: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  rank?: string;
  unit?: string;
  role: 'soldier' | 'commander' | 'admin';
  controlCenter?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  user: User;
}

export interface RegisterData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  rank?: string;
  unit?: string;
}

export interface LoginFormData {
  militaryId: string;
  password: string;
  remember: boolean;
}

export interface ApiError { 
  message: string;
  statusCode?: number;
}