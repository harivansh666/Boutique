export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: "suits" | "saree" | "lehenga" | "readymade" | "kurta" | "dresses";
  fabric: string;
  sizes: string[];
  description: string;
  featured?: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface WishlistItem {
  product: Product;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: "customer" | "admin";
}

export interface Measurements {
  bust: number;
  waist: number;
  hip: number;
  shoulder: number;
  armLength: number;
  height: number;
}

export interface Order {
  id: string;
  _id?: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "placed" | "confirmed" | "stitching" | "shipped" | "delivered";
  date: string;
  createdAt?: string;
  trackingId?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  slug: "suits" | "saree" | "lehenga" | "readymade";
  image: string;
  description: string;
}
