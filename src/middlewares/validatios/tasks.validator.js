import { body } from "express-validator";
import { TaskModel } from "../../models/task.model.js";
import { UserModel } from "../../models/user.model.js";

export const createTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El título debe tener al menos 3 caracteres"),
  body("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener al menos 10 caracteres"),
  body("status")
    .optional() //
    .isIn(["To Do", "In Progress", "Done"]) //aca valido que el estado sea uno de los valores permitidos
    .withMessage("El estado debe ser 'To Do', 'In Progress' o 'Done'"),
  body("assignedTo")
    .notEmpty()
    .withMessage("Debe elegir un usuario para asignar la tarea")
    .custom(async (value) => {
      //verifico que el usuario exista
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("El usuario asignado no existe");
      }
      return true;
    }),
];
export const updateTaskValidator = [
  body("title")
    .optional() 
    .isLength({ min: 3 })
    .withMessage("El título debe tener al menos 3 caracteres"),
  body("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener al menos 10 caracteres"),
  body("status")
    .optional()
    .isIn(["To Do", "In Progress", "Done"])
    .withMessage("El estado debe ser 'To Do', 'In Progress' o 'Done'"),
  body("assignedTo")
    .optional() 
    .custom(async (value) => {
      // el nuevo usuario exista?
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("El usuario asignado no existe");
      }
      return true;
    }),
];