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
        lineaterapeutica
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
    nuevoProducto.presentacion = presentacion;
    nuevoProducto.registro = registro;
    nuevoProducto.imagen = imagen;
    nuevoProducto.advertencias = advertencias;
    nuevoProducto.recomendaciones = recomendaciones;
    nuevoProducto.calculadora = calculadora;
    nuevoProducto.lineaterapeutica = lineaterapeutica;
    
    nuevoProducto.save()
    .then((data)=>{
        res.json(data);
    })
    .catch((error)=>{
        next(error)
    })
    
}