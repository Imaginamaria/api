import { Schema, model } from "mongoose";

// definir el esquema de la colección usuarios
const schemaUsuario = new Schema({
    id: {type: Number, unique: true},
    nombre: String,
    apellido: String,
    email:{type: String, unique:true},
    password: String,
    localidad: String,
    telefono: String,
    veterinaria: String,
    session: String,
});

// exportar el modelo
export const ModeloUsuario = model("Usuario", schemaUsuario)