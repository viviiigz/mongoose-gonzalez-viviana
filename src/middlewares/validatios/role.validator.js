import { body, param } from "express-validator";
import { Types } from "mongoose";
import { RoleModel } from "../../models/role.model.js";


export const createRoleValidator = [
  body("rolename")
    .notEmpty()
    .withMessage("El nombre del rol es obligatorio")
    .isString()
    .withMessage("El nombre del rol debe ser una cadena de texto"),
];

export const addRoleToUserValidator = [ // middleware de validacion para asignar un rol a un usuario
  body("roleId")
    .exists()
    .withMessage("El 'roleId' es obligatorio")
    .custom(async (value) => {
      if (!Types.ObjectId.isValid(value)) {
        throw new Error("El 'roleId' no es un ID válido de MongoDB");
      }
      const role = await RoleModel.findById(value);
      if (!role) {
        throw new Error("El rol especificado no existe");
      }
      return true;
    }),
];

export const removeRoleFromUserValidator = [
  param("id")
    .exists()
    .withMessage("El ID del rol es obligatorio en los parámetros")
    .custom(async (value) => {

        if (!Types.ObjectId.isValid(value)) {
        throw new Error("El ID del rol no es válido");
      }
      const role = await RoleModel.findById(value);
      if (!role) {
        throw new Error("El rol especificado no existe");
      }
      return true;
    }),
];
