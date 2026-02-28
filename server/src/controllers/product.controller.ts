import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import ResponseHandler from "../utils/ApiResponse.js";

export const getProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const allproduct = await Product.find();
    return ResponseHandler.send(res, { statusCode: 200, data: allproduct });
  },
);

export const getProductByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        return ResponseHandler.send(res, {
          statusCode: 404,
          data: { message: "Product not found" },
        });
      }

      return ResponseHandler.send(res, { statusCode: 200, data: product });
    } catch (error) {
      return ResponseHandler.send(res, {
        statusCode: 400,
        data: { message: "Invalid product ID or not found" },
      });
    }
  },
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      name,
      description,
      price,
      stock,
      category,
      images,
      fabric,
      sizes,
      originalPrice,
      featured,
      inStock,
    } = req.body;

    if (!name || !price || !stock || !category || !fabric) {
      return ResponseHandler.send(res, {
        statusCode: 400,
        data: { message: "Please provide all required fields" },
      });
    }

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      images: images || [],
      fabric,
      sizes: sizes || ["Free Size"],
      originalPrice,
      featured: featured || false,
      inStock: inStock ?? true,
    });

    const createdProduct = await product.save();

    return ResponseHandler.send(res, {
      statusCode: 201,
      data: createdProduct,
    });
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedProduct) {
        return ResponseHandler.send(res, {
          statusCode: 404,
          data: { message: "Product not found" },
        });
      }

      return ResponseHandler.send(res, {
        statusCode: 200,
        data: updatedProduct,
      });
    } catch (error) {
      return ResponseHandler.send(res, {
        statusCode: 400,
        data: { message: "Failed to update product" },
      });
    }
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return ResponseHandler.send(res, {
          statusCode: 404,
          data: { message: "Product not found" },
        });
      }

      return ResponseHandler.send(res, {
        statusCode: 200,
        data: { message: "Product removed successfully" },
      });
    } catch (error) {
      return ResponseHandler.send(res, {
        statusCode: 400,
        data: { message: "Failed to delete product" },
      });
    }
  },
);
