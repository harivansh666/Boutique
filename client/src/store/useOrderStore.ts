import { create } from "zustand";
import { Order } from "@/types";
import { axiosInstance } from "@/config";

type OrderStore = {
  orders: Order[];
  isLoading: boolean;
  error: string | null;

  createOrder: (orderData: any) => Promise<void>;
  fetchUserOrders: () => Promise<void>;
  fetchAllOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: string) => Promise<void>;
};

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  isLoading: false,
  error: null,

  createOrder: async (orderData) => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.post("/orders", orderData);
      set((state) => ({ orders: [res.data.data, ...state.orders] }));
    } catch (error: any) {
      console.error("Create order error:", error);
      set({ error: error.response?.data?.message || "Failed to create order" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserOrders: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.get("/orders/myorders");
      set({ orders: res.data.data });
    } catch (error: any) {
      console.error("Fetch user orders error:", error);
      set({ error: error.response?.data?.message || "Failed to fetch orders" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAllOrders: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.get("/orders");
      set({ orders: res.data.data });
    } catch (error: any) {
      console.error("Fetch all orders error:", error);
      set({ error: error.response?.data?.message || "Failed to fetch orders" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.put(`/orders/${orderId}/status`, {
        status,
      });
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === orderId ? res.data.data : order,
        ),
      }));
    } catch (error: any) {
      console.error("Update order status error:", error);
      set({
        error: error.response?.data?.message || "Failed to update order status",
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
