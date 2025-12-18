import prisma from "../../config/prisma.js";
import type { NewUser, User, UpdateUser } from "./users.model.js";
type UserWithPassword = Awaited<ReturnType<typeof prisma.user.findUnique>>;

export class UserRepository {
  async create(data: NewUser, hashedPassword: string): Promise<User> {
    try {
      const user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          role: data.role,
          password: hashedPassword,
        },
      });

      const { password, ...safeUser } = user;
      return safeUser as User;
    } catch (error) {
      if (error instanceof Error) {
        console.error(" [REPOSITORY] Message:", error.message);
        console.error(" [REPOSITORY] Stack:", error.stack);
      }
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
      });

      if (!user) {
        return null;
      }

      const { password, ...safeUser } = user;
      return safeUser as User;
    } catch (error) {
      throw error;
    }
  }

  async findByEmailWithPassword(
    email: string
  ): Promise<UserWithPassword | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: UpdateUser): Promise<User | null> {
    try {
      const user = await prisma.user.update({
        where: { id: id },
        data: {
          name: data.name,
          profilePictureUrl: data.profilePictureUrl,
          niche: data.niche,
          companyName: data.companyName,
        },
      });
      const { password, ...safeUser } = user;
      return safeUser as User;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.user.delete({ where: { id: id } });
      return true;
    } catch {
      return false;
    }
  }
}
