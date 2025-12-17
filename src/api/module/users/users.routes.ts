// src/modules/users/users.routes.ts
import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
} from "./users.controller";

const router = Router();

/**
 * @route   POST /api/users
 * @desc    Inscription d'un nouvel utilisateur (Créateur ou Marque)
 * @access  Public
 */
router.post("/", createUserController);

/**
 * @route   GET /api/users/:id
 * @desc    Récupérer les informations publiques d'un profil
 * @access  Public (pour l'instant)
 */
router.get("/:id", getUserByIdController);

// Les prochaines routes à ajouter seront :
// router.put('/:id', updateUserController);    // Mise à jour du profil
// router.delete('/:id', deleteUserController); // Suppression du compte

export default router;
