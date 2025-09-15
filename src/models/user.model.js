import { model, Schema, Types } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false, //por defecto el usuario no esta eliminado
    },
    // Relación de Muchos a Muchos con Role
    roles: [
      {
        type: Types.ObjectId,
        ref: "Role",
      },
    ],
    // relacion con profile de 1 a 1
    profile: {
      nombre: {
        type: String,
        trim: true,
      },
      apellido: {
        type: String,
        trim: true,
      },
      bio: {
        type: String,
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false, // evita el campo '__v' en los documentos
  }
);

export const UserModel = model("User", UserSchema);
//relacion con roles de n a m pq un usuario puede tener carios roles y un rol puede tener varios usuarios
//relacion con tasks de 1 a n pq un usuario puede tener varias tareas pero una tarea solo puede tener un usuario
//relacion con profiles de 1 a 1 pq un usuario solo puede tener un perfil y un perfil solo puede tener un usuario
