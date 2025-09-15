import { body } from "express-validator";

export const profileValidator = [
  body("nombre").optional().isString().trim(),
  body("apellido").optional().isString().trim(),
  body("bio").optional().isString().trim(),
  body("phone").optional().isString().trim(),
];