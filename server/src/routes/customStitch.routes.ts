import { Router } from "express";
import {
  createCustomStitchRequest,
  getMyCustomStitches,
} from "../controllers/customStitch.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const customStitchRouter = Router();

customStitchRouter.route("/").post(authMiddleware, createCustomStitchRequest);
customStitchRouter
  .route("/my-requests")
  .get(authMiddleware, getMyCustomStitches);

export default customStitchRouter;
