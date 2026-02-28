import Router, { type Request, type Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import ResponseHandler from "../utils/ApiResponse.js";

const bulkRouter = Router();

bulkRouter.post(
  "/bulkproduct",
  asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await Product.insertMany(data);
    return ResponseHandler.send(res, {
      statusCode: 200,
      data: { message: "Products added successfully", result },
    });
  }),
);

export default bulkRouter;
