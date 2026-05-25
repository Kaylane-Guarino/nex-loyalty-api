import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import transactionRoutes from "./routes/transactionRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    message: "Nex Loyalty API is running.",
  });
});

app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

export default app;