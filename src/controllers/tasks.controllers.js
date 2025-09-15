import { validationResult } from "express-validator";
import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find().populate("assignedTo");
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener las tareas" });
  }

};
export const getTaskById = async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id)
      .populate("assignedTo"); 

    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener la tarea" });
  }
};

export const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, assignedTo, status } = req.body;

    const newTask = await TaskModel.create({
      title,
      description,
      assignedTo,
      status,
    });

    res.status(201).json({
      msg: "Tarea creada exitosamente",
      task: newTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear la tarea" });
  }
};

export const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
    //devolveme la tarea después de que se haya actualizado, pq el retobado de mongo te la devuelve como estaba antes de actualizarla

    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    res.status(200).json({
      msg: "Tarea actualizada correctamente",
      task: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar la tarea" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    res.status(200).json({ msg: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar la tarea" });
  }
};
