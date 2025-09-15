//relacion con user de 1 a 1 pq un usuario solo puede tener un perfil y un perfil solo puede tener un usuario
// import { model, Schema, Types } from "mongoose";

// const ProfileSchema = new Schema(

// );

// export const ProfileModel = model("Profile", ProfileSchema);

// El perfil de usuario se como un subdocumento incrustado en el 
// modelo de User para simplificar 
// Esto elimina la necesidad de un modelo, controlador y rutas separados,
//  ya que el perfil es una parte fundamental del usuario y todas las operaciones
//   se manejan de manera más eficiente dentro de un solo documento.