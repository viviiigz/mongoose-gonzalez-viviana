import { body} from "express-validator";
import { Types } from "mongoose";
import {UserModel} from "../../models/user.model.js";
import { RoleModel } from "../../models/role.model.js";


export const createUserValidator = [
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre de usuario debe tener al menos 3 caracteres")
    .custom(async (value) => {
      //es uan herramienta para validar cualquier cosa que necesite un poco mas de lógica

      const user = await UserModel.findOne({ username: value });

      if (user) {
        throw new Error("El  nombre de usuario ya está en uso");
      }
    }),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) {
        throw new Error("El email ya está en uso");
      }
      return true;
    }),
    
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  body("roleId")
    .optional()
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

export const updateUserValidator = [
  body("username")
    .optional() //el optional hace que el campo no sea obligatorio
    .isLength({ min: 3 })
    .withMessage("El nombre de usuario debe tener al menos 3 caracteres")
    .custom(async (value, { req }) => {
      const user = await UserModel.findOne({ username: value });
      //aca verifico que el usuario que encontro no sea el mismo que estoy actualizando
      if (user && user._id.toString() !== req.params.id) {
        throw new Error("El nombre de usuario ya está en uso");
      }
      return true;
    }),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Debe ser un email válido")
    .custom(async (value, { req }) => {
      const user = await UserModel.findOne({ email: value });
      if (user && user._id.toString() !== req.params.id) {
        throw new Error("El email ya está en uso");
      }
      return true;
    }),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

      body("roleId")
    .optional()
    .custom(async (value) => {
      // Esta validación se ejecuta solo si el campo es enviado
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
