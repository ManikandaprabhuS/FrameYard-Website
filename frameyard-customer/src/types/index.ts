export interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "CUSTOMER";
  phoneNumber?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  phoneNumber?: string;
}

export interface RegisterCredentials {
  email: string;
  password?: string;
  name: string;
  phoneNumber?: string;
}
