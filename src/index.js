require("dotenv").config();
const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
