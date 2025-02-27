import {ModeloArticulo} from "../database/models/ModeloArticulo.js"
import { formatearFiltrosDB } from "../utils/functions.js";


export const postArticulo= async(req, res, next)=>{
    const {
        titulo,
        colgado,
        descripcion,
        destacado,
        detalle,
        fecha,
        imagen,
        temas,
        especie,
    } = req.body;
    const nuevoArticulo = new ModeloArticulo();
    nuevoArticulo.id = await obtenerProximoId(ModeloArticulo);
    nuevoArticulo.titulo= titulo;
    nuevoArticulo.colgado = colgado;
    nuevoArticulo.descripcion = descripcion;
    nuevoArticulo.destacado = destacado;
    nuevoArticulo.detalle = detalle;
    nuevoArticulo.fecha = fecha;
    nuevoArticulo.imagen = imagen;
    nuevoArticulo.especie = Array.isArray(especie) ? especie : [especie];
    //asegurarme de que siempre sea un array (en caso de que req.body.temas pueda venir vacío o con un solo valor)
    nuevoArticulo.temas = Array.isArray(temas) ? temas : [temas];
    
    nuevoArticulo.save()
    .then((data)=>{
        res.json(data);
    })
    .catch((error)=>{
        next(error)
    })
    
}