export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  rank?: string;
  unit?: string;
  role: "soldier" | "commander" | "admin";
}

export interface LoginResponse {
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
  controlCenter?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
