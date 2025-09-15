import { UserModel } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { TaskModel } from "../models/task.model.js";


export const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los usuarios" });
  }
};

export const getAllUsersWithTasks = async (req, res) => {
  try {
    const users = await UserModel.find();

    const usersWithTasks = await Promise.all(
      users.map(async (user) => {
        //el map sirve para transformar un array en otro
        const tasks = await TaskModel.find({ assignedTo: user._id });
        return {
          user: user,
          tasks: tasks,
        };
      })
    );

    res.status(200).json(usersWithTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener usuarios y sus tareas" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el usuario" });
  }
};
export const createUser = async (req, res) => {
  // errores del middleware de validacion
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json({
      msg: "Usuario creado correctamente",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el usuario" });
  }
};

export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.status(200).json({
      msg: "Usuario actualizado correctamente",
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    //aca va la eliminacion en cascada uso el id del usuario eliminado para encontrar y borrar sus hijos
    await TaskModel.deleteMany({ assignedTo: user._id });

    res
      .status(200)
      .json({ msg: "Usuario y sus tareas eliminados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el usuario" });
  }
};

export const addRoleToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { roleId } = req.body;

    const user = await UserModel.findById(userId);


    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { roles: roleId } },
      { new: true }
    ).populate("roles");

    res.status(200).json({
      msg: "Rol añadido al usuario exitosamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al añadir el rol al usuario" });
  }
};

export const removeRoleFromUser = async (req, res) => {
  try {
    const { userId, id } = req.params;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { roles: id } },
      { new: true }
    ).populate("roles");

    res.status(200).json({
      msg: "Rol removido del usuario exitosamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al remover el rol del usuario" });
  }
};


//controladores de perfiles


// controlador para crear o actualizar un perfil
export const createOrUpdateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profileData = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    //$set para actualizar el objeto incrustado 'profile'
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { profile: profileData } },
      { new: true } // retorna el documento actualizado
    );

    res.status(200).json({
      msg: "Perfil actualizado exitosamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el perfil" });
  }
};

// Controlador para obtener un perfil
export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId).select("profile");

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.status(200).json({
      msg: "Perfil obtenido exitosamente",
      profile: user.profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el perfil" });
  }
};