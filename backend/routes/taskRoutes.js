import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
  filterTasksByStatus,
} from "../controller/taskController.js";

const router = express.Router();

// create task
router.post("/", protect, createTask);

// list or filter tasks (GET /api/task?status=...)
router.get("/", protect, filterTasksByStatus);

// tasks for a specific project
router.get("/project/:projectId", protect, getTasksByProject);

// update / delete
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
