import express from "express";
import type { Application } from "express";
import cookieParser from "cookie-parser";
import usersRoutes from "./modules/users/users.routes";
import authRoutes from "./modules/auth/auth.routes";
const createApp = (): Application => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "PromoWatch API operational!",
      status: "Ready",
    });
  });

  app.use("/api/v1/users", usersRoutes);
  app.use("/api/v1/auth", authRoutes);

  return app;
};

export default createApp;
