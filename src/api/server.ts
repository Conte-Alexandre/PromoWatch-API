import createApp from "./app.js";

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(
    `🚀 PromoWatch API Server is running on http://localhost:${PORT}`
  );
  console.log(`Mode: ${process.env.NODE_ENV || "development"}`);
});
