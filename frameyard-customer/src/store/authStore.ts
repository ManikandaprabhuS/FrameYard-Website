import { create } from "zustand";
import type { User, LoginCredentials, RegisterCredentials } from "../types";
import { authService } from "../services/auth.service";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("fy_customer_auth_token"),
  isAuthenticated: !!localStorage.getItem("fy_customer_auth_token"),
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.login(credentials);
      if (data.success && data.token && data.user) {
        localStorage.setItem("fy_customer_auth_token", data.token);
        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ error: data.message || "Login failed", isLoading: false });
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message || "An error occurred",
        isLoading: false,
      });
      throw err;
    }
  },

  register: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.register(credentials);
      if (data.success && data.token && data.user) {
        localStorage.setItem("fy_customer_auth_token", data.token);
        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ error: data.message || "Registration failed", isLoading: false });
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message || "An error occurred",
        isLoading: false,
      });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("fy_customer_auth_token");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  checkAuth: async () => {
    const token = localStorage.getItem("fy_customer_auth_token");
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    set({ isLoading: true });
    try {
      const data = await authService.getCurrentUser();
      if (data.success && data.user) {
        set({
          user: data.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        localStorage.removeItem("fy_customer_auth_token");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      localStorage.removeItem("fy_customer_auth_token");
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
