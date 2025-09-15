import { Router } from "express";
import { validator } from "../middlewares/validator.js";
import {
  addRoleToUserValidator,
  removeRoleFromUserValidator,
} from "../middlewares/validatios/role.validator.js";

import {
  createUserValidator,
  updateUserValidator,
} from "../middlewares/validatios/user.validator.js";
import {
  createUser,
  deleteUser,
  getAllUser,
  // getAllUsersWithTasks,
  getUserById,
  updateUser,
  addRoleToUser,
  removeRoleFromUser,
} from "../controllers/user.controllers.js";

export const userRoutes = Router();

// ruta para crear un usuario
userRoutes.post("/users", createUserValidator, validator, createUser);

// ruta para traer todos los usuarios
userRoutes.get("/users", getAllUser);
// userRoutes.get("/users", getAllUsersWithTasks);

// ruta para traer un solo usuario
userRoutes.get("/users/:id", getUserById);

// ruta para actualizar un usuario
userRoutes.put("/users/:id", updateUserValidator, validator, updateUser);

// ruta para eliminar un usuario
userRoutes.delete("/users/:id", deleteUser);

// ruta para agregar un rol a un usuario
userRoutes.post(
  "/users/:userId/roles",
  addRoleToUserValidator,
  validator,
  addRoleToUser
);

userRoutes.delete(
  "/users/:userId/roles/:id",
  removeRoleFromUserValidator,
  validator,
  removeRoleFromUser
);
