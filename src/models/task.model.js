//relacion con users de 1 a n pq un usuario puede tener varias tareas pero una tarea solo puede tener un usuario
import { model, Schema, Types } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"], 
      default: "To Do",
    },
    // una tarea pertenece a un solo usuario
    assignedTo: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, 
    versionKey: false, // evita el campo '__v' en los documentos
  }
);

export const TaskModel = model("Task", TaskSchema);