// src/modules/users/users.routes.ts
import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
} from "./users.controller";

const router = Router();

router.post("/", createUserController);

router.get("/:id", getUserByIdController);

router.put("/:id", updateUserByIdController);

router.delete("/:id", deleteUserByIdController);
export default router;
