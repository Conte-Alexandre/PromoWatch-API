import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/types";
import { UserRole } from "../modules/users/users.model";

export const authorize = (allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "Utilisateur non authentifié." });
      return;
    }
    if (!allowedRoles.includes(req.user.role)) {
      res
        .status(403)
        .json({ message: "Accès interdit : privilèges insuffisants." });
      return;
    }
    next();
  };
};
