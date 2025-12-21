import jwt from "jsonwebtoken";
import { AuthRepository } from "./auth.repository";
import { UserRepository } from "../users/users.repository";
import { TokenPayload, AuthResponse } from "./auth.model.js";
import bcrypt from "bcrypt";
import { User, UserRole } from "../users/users.model.js";
const userRepository = new UserRepository();
const authRepository = new AuthRepository();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

export class AuthService {
  private generateTokens(payload: TokenPayload) {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user) {
      throw new Error("erreur lors de l'authentification");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("erreur lors de l'authentification");
    }
    const { password: _password, ...userWithoutPassword } = user;
    const userToken = this.generateTokens;
    const cleanUser: User = {
      ...userWithoutPassword,
      role: userWithoutPassword.role as UserRole,
    };
    const payload: TokenPayload = {
      userId: cleanUser.id,
      role: cleanUser.role,
    };
    const tokens = this.generateTokens(payload);

    await authRepository.createRefreshToken(cleanUser, tokens.refreshToken);
    return {
      user: cleanUser,
      ...tokens,
    };
  }
}
