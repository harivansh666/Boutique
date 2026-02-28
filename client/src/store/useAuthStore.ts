import { create } from "zustand";
import axios from "axios";
import { User, Measurements } from "@/types";
import { axiosInstance } from "@/config";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  measurements: Measurements | null;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  saveMeasurements: (m: Measurements) => void;
  users: User[];
  fetchUsers: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  measurements: null,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({
        user: res.data.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isCheckingAuth: false });
    }
  },
  login: async (email, password) => {
    try {
      const res = await axios.post("/api/auth/signin", { email, password });
      set({ user: res.data.data.user, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  signup: async (name, email, password) => {
    try {
      const res = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });

      console.log(res.data);
      set({ user: res.data.data.user, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/signout");
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
  saveMeasurements: (m) => set({ measurements: m }),
  users: [],
  fetchUsers: async () => {
    try {
      const res = await axiosInstance.get("/auth/users");
      set({ users: res.data.data });
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  },
}));
