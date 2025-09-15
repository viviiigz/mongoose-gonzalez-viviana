import { validationResult } from "express-validator";
import { RoleModel } from "../models/role.model.js";
import { UserModel } from "../models/user.model.js";

export const createRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { rolename } = req.body;

    const newRole = await RoleModel.create({
      rolename,
    });

    res.status(201).json({
      msg: "Rol creado exitosamente",
      role: newRole,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el rol" });
  }
};


export const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.find();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los roles" });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const role = await RoleModel.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ msg: "Rol no encontrado" });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el rol" });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;

    const role = await RoleModel.findByIdAndDelete(roleId);
    if (!role) {
      return res.status(404).json({ msg: "Rol no encontrado" });
    }

    // $pull elimina el id del rol de todos los arrays 'roles' de los usuarios
    await UserModel.updateMany(
      { roles: roleId },
      { $pull: { roles: roleId } }
    );

    res.status(200).json({
      msg: "Rol elimininado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el rol" });
  }
};