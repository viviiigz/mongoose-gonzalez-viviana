import { Router } from "express";
import { validator } from "../middlewares/validator.js";
import {
  createTaskValidator,
  updateTaskValidator,
} from "../middlewares/validatios/tasks.validator.js";
import {
  createTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    updateTask,
} from "../controllers/tasks.controllers.js";

export const taskRoutes = Router();

taskRoutes.post("/tasks", createTaskValidator, validator, createTask);

taskRoutes.get("/tasks", getAllTasks);

taskRoutes.get("/tasks/:id", getTaskById);

taskRoutes.put("/tasks/:id", updateTaskValidator, validator, updateTask);

taskRoutes.delete("/tasks/:id", deleteTask);
