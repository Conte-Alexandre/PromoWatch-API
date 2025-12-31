import { Request } from "express";
import { UserRole } from "../modules/users/users.model";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: UserRole;
  };
}
