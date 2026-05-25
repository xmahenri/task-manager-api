import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authMiddleware } from "./middlewares/authMiddleware";
import taskRoutes from "./routes/taskRoutes";

import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando 🚀",
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

app.get("/profile", authMiddleware, (req, res) => {
  return res.json({
    message: "Rota protegida acessada com sucesso 🔒",
  });
});

