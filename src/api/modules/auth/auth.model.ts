import { User, UserRole } from "../users/users.model";
export type TokenPayload = {
  userId: string;
  role: UserRole;
};
export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
