import express from "express";
import type { Application } from "express";

import usersRoutes from "./modules/users/users.routes";

const createApp = (): Application => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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
