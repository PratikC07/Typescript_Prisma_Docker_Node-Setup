import express from "express";
import apiRouter from "./api.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Main health check
app.get("/api/healthcheck", (req, res) => {
  res.json({ message: "API is running." });
});

// Mount the main API router
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
