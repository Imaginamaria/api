import {Schema, model} from "mongoose";

//definir el esquema de la coleccion de productos

const schemaProducto = new Schema({

    id: {type: Number, unique:true},
    nombre: String,
    colgado: String,
    informacion: String,
    dosificacion: String,
    composicion: String,
    tiempos: String,
    especies: String,
    presentacion: Array,
    registro: String,
    imagen: String,
    advertencias: String,
    recomendaciones: String,
    calculadora: { type: Number },
    lineaterapeutica: String,
    marca: String,
    precio: { type: Number } ,
    zafra: [Number]
})

//crear el modelo

export const ModeloProducto =model("Producto", schemaProducto)