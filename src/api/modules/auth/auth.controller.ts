import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({
        message: "Erreur de connexion",
      });
      return;
    }
    const { user, accessToken, refreshToken } = await authService.login(
      email,
      password
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS en production uniquement
      sameSite: "strict", // Protection contre le CSRF
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
    });
    res.status(200).json({
      message: "Connexion réussie",
      data: user,
      accessToken,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";

    res.status(401).json({
      message: "Échec de l'authentification",
      error: message,
    });
  }
};
