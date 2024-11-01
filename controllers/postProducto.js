import { ModeloProducto } from "../database/models/ModeloProducto.js";
import { obtenerProximoId } from "../utils/functions.js";

export const postProducto= async(req, res, next)=>{
    const {
        nombre,
        colgado,
        informacion,
        dosificacion,
        composicion,
        tiempos,
        especies,
        presentacion,
        registro,
        imagen,
        advertencias,
        recomendaciones,
        calculadora,
        lineaterapeutica,
        marca,
        precio
    } = req.body;
    const nuevoProducto = new ModeloProducto();
    nuevoProducto.id = await obtenerProximoId(ModeloProducto);
    nuevoProducto.nombre = nombre;
    nuevoProducto.colgado = colgado;
    nuevoProducto.informacion = informacion;
    nuevoProducto.dosificacion = dosificacion;
    nuevoProducto.composicion = composicion;
    nuevoProducto.tiempos = tiempos;
    nuevoProducto.especies = especies;
    //asegurarme de que siempre sea un array (en caso de que req.body.presentacion pueda venir vacío o con un solo valor)
    nuevoProducto.presentacion = Array.isArray(presentacion) ? presentacion : [presentacion];
    nuevoProducto.registro = registro;
    nuevoProducto.imagen = imagen;
    nuevoProducto.advertencias = advertencias;
    nuevoProducto.recomendaciones = recomendaciones;
    nuevoProducto.calculadora = calculadora;
    nuevoProducto.lineaterapeutica = lineaterapeutica;
    nuevoProducto.marca = marca;
    nuevoProducto.precio = precio;
    
    nuevoProducto.save()
    .then((data)=>{
        res.json(data);
    })
    .catch((error)=>{
        next(error)
    })
    
}