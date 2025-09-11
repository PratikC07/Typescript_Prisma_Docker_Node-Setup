import express from "express";
import apiRouter from "./api.js";
import redirectRouter from "./modules/redirect/redirect.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Main health check
app.get("/api/healthcheck", (req, res) => {
  res.json({ message: "API is running." });
});

// Mount the main API router
app.use("/api", apiRouter);

// ✨ Mount the redirect router at the root level
app.use("/s", redirectRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
