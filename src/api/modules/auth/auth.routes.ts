import { Router } from "express";
import {
  loginController,
  refreshController,
  logoutController,
} from "./auth.controller";
import { createUserController } from "../users/users.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize.middleware";
import { isOwnerOrAdmin } from "../../middlewares/check-owner.middleware";
const router = Router();

router.post("/login", loginController);
router.post("/register", createUserController);
router.post("/refresh", verifyToken, refreshController);
router.post("/logout", verifyToken, logoutController);
export default router;
