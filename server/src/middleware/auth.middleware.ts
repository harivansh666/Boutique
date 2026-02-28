import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/ApiResponse.js";

interface DecodedToken {
  id: string;
  email?: string;
}

export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. Get the token from cookies or authorization header
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. If no token is found
    if (!token) {
      return ResponseHandler.send(res, {
        statusCode: 401,
        success: false,
        data: { message: "Not authorized to access this route. Please login." },
      });
    }

    try {
      // 3. Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your_jwt_secret",
      ) as DecodedToken;

      // Attach user to request (using a generic attachment or expanding Request type)
      // For now we just attach the decoded id to the body or to a custom property if we expanded Request
      // To avoid typescript errors without extending Express Request, we'll cast to any for this quick fix
      // or export a custom interface extending Request.
      (req as any).user = { id: decoded.id };

      next();
    } catch (error) {
      return ResponseHandler.send(res, {
        statusCode: 401,
        success: false,
        data: { message: "Token is invalid or expired." },
      });
    }
  },
);

export const adminMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    // We need to fetch the user from DB to verify role if we don't store role in token
    // Our token currently only has { id }.
    const dbUser = await User.findById(user.id);

    if (dbUser && dbUser.role === "admin") {
      next();
    } else {
      return ResponseHandler.send(res, {
        statusCode: 403,
        success: false,
        data: { message: "Access denied. Admin role required." },
      });
    }
  },
);
