import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ResponseHandler from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "your_jwt_secret", {
    expiresIn: "7d",
  });
};

const sendTokenResponse = (
  user: any,
  statusCode: number,
  res: Response,
  message: string,
) => {
  const token = generateToken(user._id.toString());

  const options = {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  res.cookie("token", token, options);

  return ResponseHandler.send(res, {
    statusCode,
    success: true,
    data: {
      message,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    },
  });
};

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return ResponseHandler.send(res, {
      statusCode: 400,
      success: false,
      data: { message: "Please provide all required fields" },
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return ResponseHandler.send(res, {
      statusCode: 400,
      success: false,
      data: { message: "User already exists" },
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
  });

  if (user) {
    sendTokenResponse(user, 201, res, "User registered successfully");
  } else {
    return ResponseHandler.send(res, {
      statusCode: 400,
      success: false,
      data: { message: "Invalid user data" },
    });
  }
});

export const signin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return ResponseHandler.send(res, {
      statusCode: 400,
      success: false,
      data: { message: "Please provide email and password" },
    });
  }

  const user = await User.findOne({ email });

  if (user && (await (user as any).matchPassword(password))) {
    sendTokenResponse(user, 200, res, "Logged in successfully");
  } else {
    return ResponseHandler.send(res, {
      statusCode: 401,
      success: false,
      data: { message: "Invalid email or password" },
    });
  }
});

export const signout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  return ResponseHandler.send(res, {
    statusCode: 200,
    success: true,
    data: { message: "Logged out successfully" },
  });
});

export const checkAuth = asyncHandler(async (req: Request, res: Response) => {
  const reqUser = (req as any).user;
  const user = await User.findById(reqUser.id).select("-password");

  if (!user) {
    return ResponseHandler.send(res, {
      statusCode: 404,
      success: false,
      data: { message: "User not found" },
    });
  }

  return ResponseHandler.send(res, {
    statusCode: 200,
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    },
  });
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find().select("-password");

  return ResponseHandler.send(res, {
    statusCode: 200,
    success: true,
    data: users,
  });
});
