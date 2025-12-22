import prisma from "../../config/prisma";
import type { NewUser, User, UpdateUser } from "../users/users.model";

export class AuthRepository {
  async createRefreshToken(userDate: User, tokenValue: string) {
    try {
      await prisma.refreshToken.create({
        data: {
          token: tokenValue,
          userId: userDate.id,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async findRefreshToken(tokenValue: string) {
    try {
      return await prisma.refreshToken.findUnique({
        where: { token: tokenValue },
        include: { user: true },
      });
    } catch (error) {
      throw error;
    }
  }
  async revokeRefreshToken(tokenValue: string): Promise<void> {
    try {
      await prisma.refreshToken.update({
        where: { token: tokenValue },
        data: { isRevoked: true },
      });
    } catch (error) {
      throw error;
    }
  }
  async revokeAllUserTokens(userId: string) {
    try {
      await prisma.refreshToken.updateMany({
        where: { userId: userId },
        data: { isRevoked: true },
      });
    } catch (error) {
      throw error;
    }
  }
  async deleteExpiredTokens() {
    try {
      await prisma.refreshToken.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
