import express from "express";
import type { Application } from "express";

import usersRoutes from "./module/users/users.routes";

const expressApp = express();

const createApp = (): Application => {
  const app = expressApp as Application;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Route de test
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "PromoWatch API operational!",
      status: "Ready",
    });
  });

  app.use("/api/v1/users", usersRoutes);

  return app;
};

export default createApp;
