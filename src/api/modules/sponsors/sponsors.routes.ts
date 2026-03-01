import { Router } from "express";
import {
  getSponsorByIdController,
  getSponsorByTagController,
  getAllSponsorController,
} from "./sponsor.controller";
const router = Router();

router.get("/id/:id", getSponsorByIdController);
router.get("/tag/:tag", getSponsorByTagController);
router.get("/", getAllSponsorController);
export default router;
