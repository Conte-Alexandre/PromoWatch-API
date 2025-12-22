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
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
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
export const refreshController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res
      .status(401)
      .json({ message: "Session expirée, veuillez vous reconnecter." });
    return;
  }

  try {
    const { accessToken } = await authService.refreshAccessToken(refreshToken);

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: "Session invalide." });
  }
};
export const logoutController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await authService.logout(refreshToken);
  }
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Déconnexion réussie" });
};
