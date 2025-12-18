import { Request, response, Response } from "express";
import { UserService } from "./users.service.js";
import type { NewUser, UpdateUser } from "./users.model.js";

const userService = new UserService();

export const createUserController = async (
  req: Request<{}, {}, NewUser>,
  res: Response
): Promise<void> => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name || !role) {
    res.status(400).json({
      message: "Les champs email, password, nom et rôle sont requis.",
    });
    return;
  }

  if (!["Creator", "Brand"].includes(role)) {
    res
      .status(400)
      .json({ message: "Le rôle doit être 'Creator' ou 'Brand'." });
    return;
  }

  try {
    const newUser = await userService.create({ email, password, name, role });

    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      console.log(email, password, name, role);
      if (error.message.includes("e-mail est déjà utilisée")) {
        res.status(409).json({ message: error.message });
        return;
      }
      res
        .status(500)
        .json({ message: "Erreur lors de la création de l'utilisateur." });
      return;
    }
    res.status(500).json({ message: "Erreur serveur inconnue." });
  }
};

export const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const userId = req.params.id;

  if (!userId) {
    res.status(400).json({ message: "L'ID utilisateur est requis." });
    return;
  }

  try {
    const user = await userService.getById(userId);

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de l'utilisateur." });
  }
};
export const updateUserByIdController = async (
  req: Request<{ id: string }, any, UpdateUser>,
  res: Response
): Promise<void> => {
  const userId = req.params.id;
  console.log(req.body);

  if (!userId) {
    res.status(404).json({ message: "L'ID utilisateur est requis." });
    return;
  }

  try {
    const user = await userService.update(userId, req.body);

    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour." });
  }
};
export const deleteUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const userId = req.params.id;

  if (!userId) {
    res.status(400).json({ message: "L'ID utilisateur est requis." });
    return;
  }

  try {
    await userService.deleteById(userId);
    res.status(204).send();
  } catch {
    res.status(404).json({ message: "Utilisateur introuvable." });
  }
};
