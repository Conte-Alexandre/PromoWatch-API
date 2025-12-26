import { Router } from "express";
import {
  loginController,
  refreshController,
  logoutController,
} from "./auth.controller";
import { createUserController } from "../users/users.controller";

const router = Router();

router.post("/login", loginController);
router.post("/register", createUserController);
router.post("/refresh", refreshController);
router.post("/logout", logoutController);
export default router;
