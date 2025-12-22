import { Request } from "express";
import { UserRole } from "../modules/users/users.model";

// On définit ce que contient le jeton une fois décodé
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: UserRole;
  };
}
