import bcrypt from "bcrypt";
import { UserRepository } from "./users.repository.js";
import prisma from "../../config/prisma.js";
import type { NewUser, User, UpdateUser } from "./users.model.js";

const SALT_ROUNDS = 10;
const userRepository = new UserRepository();

export class UserService {
  async create(data: NewUser): Promise<User> {
    const existingUser = await userRepository.findByEmailWithPassword(
      data.email
    );
    if (existingUser) {
      throw new Error("L'adresse e-mail est déjà utilisée.");
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const userData = {
      email: data.email,
      name: data.name,
      role: data.role,
      ...(data.profilePictureUrl && {
        profilePictureUrl: data.profilePictureUrl,
      }),
    };

    const createdUser = await userRepository.create(
      userData as NewUser,
      hashedPassword
    );

    return createdUser;
  }

  async getById(id: string): Promise<User | null> {
    return userRepository.findById(id);
  }
  async update(id: string, data: UpdateUser): Promise<User | null> {
    const userData = {
      name: data.name,
      profilePictureUrl: data.profilePictureUrl,
      niche: data.niche,
      companyName: data.companyName,
    };
    return await userRepository.update(id, userData);
  }
  async deleteById(id: string): Promise<void> {
    await userRepository.delete(id);
  }
}
