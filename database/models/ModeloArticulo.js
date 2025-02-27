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
    temas: Array,
    especies: Array
})

//crear el modelo

export const ModeloArticulo =model("Articulo", schemaArticulo)  