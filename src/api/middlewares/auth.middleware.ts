import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/types"; // On utilise ton interface personnalisée
import { UserRole } from "../modules/users/users.model";

export function verifyToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Accès refusé. Aucun jeton fourni." });
    return;
  }
  try {
    const secret = process.env.ACCESS_TOKEN_SECRET || "access_secret";
    const decoded = jwt.verify(token, secret) as {
      userId: string;
      role: UserRole;
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Jeton invalide ou expiré." });
  }
}
