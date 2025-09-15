//exporto para despues importar en app.js
import { Router } from "express";
import { userRoutes } from "./user.routes.js";
import { taskRoutes } from "./tasks.routes.js";
// import { roleRoutes } from "./role.routes.js";

export const routes = Router();

routes.use(userRoutes);
routes.use(taskRoutes);
// routes.use(roleRoutes);