import { create } from "zustand";
import { registerUser, loginUser, forgetPassword, resetPassword, logoutUser } from "../services/authService";
import type { AuthState, RegisterData, LoginData, ForgetPasswordData, ResetPasswordData } from "@/types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  register: async (data: RegisterData) => {
    try {
      set({ loading: true, error: null });
      const res = await registerUser(data);
      console.log({ user: res.user, token: res.token, loading: false })
      set({ user: res.user, token: res.token, loading: false });
      // success handled via state
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      // failure handled via state
    }
  },

  login: async (data: LoginData) => {
    try {
      set({ loading: true, error: null });
      const res = await loginUser(data);
      console.log({ user: res.user, token: res.token, loading: false })
      set({ user: res.user, token: res.token, loading: false });
      localStorage.setItem("token", res.token);
      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      return false;
    }
  },


  forgetPassword: async (data: ForgetPasswordData) => {
    try {
      set({ loading: true, error: null });
      const res = await forgetPassword(data);
      set({ loading: false });
      return res;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  resetPassword: async (data: ResetPasswordData) => {
    try {
      set({ loading: true, error: null });
      const res = await resetPassword(data);
      set({ loading: false });
      return res;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  logout: async () => {
    try {
      await logoutUser();
    } catch (err: any) {
      console.warn("Logout API failed, clearing local anyway:", err.message);
    } finally {
      localStorage.removeItem("token");
      set({ user: null, token: null });
    }
  },
}));