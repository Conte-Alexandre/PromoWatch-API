// src/modules/users/users.routes.ts
import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
} from "./users.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize.middleware";
import { isOwnerOrAdmin } from "../../middlewares/check-owner.middleware";
const router = Router();

router.post("/", createUserController);

router.get("/:id", getUserByIdController);

router.put("/:id", authorize, updateUserByIdController);

router.delete("/:id", verifyToken, isOwnerOrAdmin, deleteUserByIdController);
export default router;
