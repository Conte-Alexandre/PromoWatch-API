import prisma from "../../config/prisma.js";
import type { NewUser, User, UpdateUser } from "./users.model.js";
type UserWithPassword = Awaited<ReturnType<typeof prisma.user.findUnique>>;

export class UserRepository {
  // --- C R E A T E (Création d'un nouvel utilisateur) ---
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
        console.error("❌ [REPOSITORY] Message:", error.message);
        console.error("❌ [REPOSITORY] Stack:", error.stack);
      }
      throw error;
    }
  }

  // --- R E A D (Trouver par ID) ---
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

  // --- U P D A T E ---
  async update(id: string, data: UpdateUser): Promise<User | null> {
    return null;
  }

  // --- D E L E T E ---
  async delete(id: string): Promise<boolean> {
    return false;
  }
}
