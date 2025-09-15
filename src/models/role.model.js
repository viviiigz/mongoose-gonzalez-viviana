//relacion de n a m con usr
import { model, Schema } from "mongoose";

const RoleSchema = new Schema(
  {
    rolename: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const RoleModel = model("Role", RoleSchema);
