import { create } from "zustand";
import { Product } from "@/types";
import { axiosInstance } from "@/config";

type Store = {
  products: Product[];
  setProducts: (products: Product[]) => void;

  isLoading: boolean;

  fetchProducts: () => Promise<Product[]>;
  createProduct: (productData: any) => Promise<void>;
  updateProduct: (id: string, productData: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
};

export const useProductStore = create<Store>((set) => ({
  products: [],
  isLoading: false,

  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get("/products/getproducts");

      const mappedProducts = res.data.data.map((p: any) => ({
        ...p,
        id: p._id || p.id,
      }));

      set({ products: mappedProducts });
      return mappedProducts;
    } catch (error) {
      console.error("Fetch products error:", error);
      throw error;
    } finally {
      set({ isLoading: false }); // ✅ always runs
    }
  },

  createProduct: async (productData) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/products", productData);
      set((state) => ({ products: [res.data.data, ...state.products] }));
    } catch (error) {
      console.error("Create product error:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProduct: async (id, productData) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.put(`/products/${id}`, productData);
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id || p._id === id
            ? { ...res.data.data, id: res.data.data._id || res.data.data.id }
            : p,
        ),
      }));
    } catch (error) {
      console.error("Update product error:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    try {
      set({ isLoading: true });
      await axiosInstance.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id && p._id !== id),
      }));
    } catch (error) {
      console.error("Delete product error:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
