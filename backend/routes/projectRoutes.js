import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createProject,
  getUserProjects,
  updateProject,
  deleteProject,
} from "../controller/projectController.js";

const router = express.Router();

router.route("/")
  .get(protect, getUserProjects)
  .post(protect, createProject);

router.route("/:id")
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;
