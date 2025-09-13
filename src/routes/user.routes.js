import { Router } from "express";
import {
  createUser
  // deleteUser,
  // getAllUser,
  // getUserById,
  // updateUser,
} from "../controllers/user.controllers.js";

export const userRoutes = Router();

// ruta para crear un usuario
userRoutes.post("/users", createUser);

// ruta para traer todos los usuarios
// userRoutes.get("/users", getAllUser);

// ruta para traer un solo usuario
// userRoutes.get("/users/:id", getUserById);

// ruta para actualizar un usuario
// userRoutes.put("/users/:id", updateUser);

// ruta para eliminar un usuario
// userRoutes.delete("/users/:id", deleteUser);