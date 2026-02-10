import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/tasks", verifyToken, createTask);
router.get("/tasks", verifyToken, getTasks);
router.put("/tasks/:id", verifyToken, updateTask);
router.delete("/tasks/:id", verifyToken, deleteTask);

export default router;
