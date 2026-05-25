import { Router } from "express";

import { TaskController } from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, TaskController.create);
router.get("/", authMiddleware, TaskController.getAll);
router.put("/:id", authMiddleware, TaskController.update);
router.delete("/:id", authMiddleware, TaskController.delete);

export default router;