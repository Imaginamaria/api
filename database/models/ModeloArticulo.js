import {Schema, model} from "mongoose";

//definir el esquema de la coleccion de articulos

const schemaArticulo = new Schema({
    id: {type: Number, unique:true},
    titulo: String,
    colgado: String,
    descripcion: String,
    destacado: String,
    detalle: String,
    fecha: String,
    imagen: String,
    temas: [String],
    especies: [String],
})

//crear el modelo

export const ModeloArticulo =model("Articulo", schemaArticulo)  