import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);

router.get("/myorders", authMiddleware, getUserOrders);
router.put("/:id/status", authMiddleware, updateOrderStatus);

export default router;
