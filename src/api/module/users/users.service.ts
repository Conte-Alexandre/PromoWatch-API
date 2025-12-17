import bcrypt from "bcrypt";
import { UserRepository } from "./users.repository.js";
import prisma from "../../config/prisma.js";
import type {
  NewUser,
  User,
  UpdateUser,
  UserCreationData,
} from "./users.model.js";

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

  // [TODO] Ajouter les méthodes update et delete ici
}
