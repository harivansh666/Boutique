import { Order, Product } from "@/types";

export const getMockOrders = (products: Product[]): Order[] => {
  if (!products || products.length < 6) return [];

  return [
    {
      id: "ORD-001",
      userId: "1",
      items: [
        { product: products[0], quantity: 1, size: "M" },
        { product: products[3], quantity: 2, size: "L" },
      ],
      total: 8397,
      status: "delivered",
      date: "2025-12-15",
      trackingId: "TRK-9281",
    },
    {
      id: "ORD-002",
      userId: "1",
      items: [{ product: products[2], quantity: 1, size: "S" }],
      total: 12999,
      status: "shipped",
      date: "2026-01-20",
      trackingId: "TRK-4523",
    },
    {
      id: "ORD-003",
      userId: "1",
      items: [{ product: products[5], quantity: 1, size: "Free Size" }],
      total: 8999,
      status: "stitching",
      date: "2026-02-10",
    },
    {
      id: "ORD-004",
      userId: "2",
      items: [{ product: products[1], quantity: 1, size: "Free Size" }],
      total: 3299,
      status: "placed",
      date: "2026-02-18",
    },
  ];
};
