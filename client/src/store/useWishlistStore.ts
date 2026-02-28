import { create } from 'zustand';
import { Product } from '@/types';

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  addItem: (product) => {
    if (!get().items.find((i) => i.id === product.id)) {
      set({ items: [...get().items, product] });
    }
  },
  removeItem: (productId) => set({ items: get().items.filter((i) => i.id !== productId) }),
  isInWishlist: (productId) => !!get().items.find((i) => i.id === productId),
  toggleItem: (product) => {
    if (get().isInWishlist(product.id)) {
      get().removeItem(product.id);
    } else {
      get().addItem(product);
    }
  },
}));
