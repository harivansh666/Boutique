import { Router } from "express";
import {
  checkAuth,
  signin,
  signout,
  signup,
  getAllUsers,
} from "../controllers/auth.controller.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/signout", signout);
authRouter.get("/check", authMiddleware, checkAuth);
authRouter.get("/users", authMiddleware, adminMiddleware, getAllUsers);

export default authRouter;
