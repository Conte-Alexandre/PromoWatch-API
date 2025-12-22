import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/types";

export const isOwnerOrAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authenticatedUser = req.user;
  const targetUserId = req.params.id;

  if (!authenticatedUser) {
    res.status(401).json({ message: "Non authentifié" });
    return;
  }

  const isAdmin = authenticatedUser.role === "Admin";
  const isOwner = authenticatedUser.userId === targetUserId;

  if (isAdmin || isOwner) {
    next();
  } else {
    res.status(403).json({
      message: "Vous n'avez pas l'autorisation de modifier ce compte.",
    });
  }
};
