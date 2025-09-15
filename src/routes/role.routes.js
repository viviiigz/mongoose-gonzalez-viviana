import { Router } from "express";
import {
    createRole,
    getAllRoles,
    getRoleById,
    deleteRole,
} from "../controllers/role.controllers.js";
import { validator } from "../middlewares/validator.js";
import { createRoleValidator } from "../middlewares/validatios/role.validator.js";

export const roleRoutes = Router();

// Rutas para leer y eliminar roles
roleRoutes.post("/roles",createRoleValidator, validator,  createRole);
roleRoutes.get("/roles", getAllRoles);
roleRoutes.get("/roles/:id", getRoleById);
roleRoutes.delete("/roles/:id", deleteRole);