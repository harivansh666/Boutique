import { Router } from "express";
import {
  getProductController,
  createProduct,
  getProductByIdController,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const productRouter = Router();

productRouter.get("/getproducts", getProductController);
productRouter.get("/:id", getProductByIdController);
productRouter.post("/", authMiddleware, createProduct);
productRouter.put("/:id", authMiddleware, updateProduct);
productRouter.delete("/:id", authMiddleware, deleteProduct);
