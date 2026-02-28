import type { Request, Response } from "express";
import { CustomStitch } from "../models/customStitch.model.js";
import ResponseHandler from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc    Create new custom stitch request
// @route   POST /api/custom-stitch
// @access  Private
export const createCustomStitchRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { measurements, designStyle, referenceImage } = req.body;
    const reqUser = (req as any).user;

    if (!measurements || !designStyle) {
      return ResponseHandler.send(res, {
        statusCode: 400,
        success: false,
        data: { message: "Please provide measurements and design style" },
      });
    }

    const customStitch = await CustomStitch.create({
      userId: reqUser.id,
      measurements,
      designStyle,
      referenceImage,
    });

    return ResponseHandler.send(res, {
      statusCode: 201,
      success: true,
      data: {
        message: "Custom stitch request submitted successfully",
        customStitch,
      },
    });
  },
);

// @desc    Get logged in user custom stitches
// @route   GET /api/custom-stitch/my-requests
// @access  Private
export const getMyCustomStitches = asyncHandler(
  async (req: Request, res: Response) => {
    const reqUser = (req as any).user;
    const customStitches = await CustomStitch.find({ userId: reqUser.id }).sort(
      { createdAt: -1 },
    );

    return ResponseHandler.send(res, {
      statusCode: 200,
      success: true,
      data: { customStitches },
    });
  },
);
