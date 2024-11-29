import {ModeloProducto} from "../database/models/ModeloProducto.js"
import { formatearFiltrosDB } from "../utils/functions.js";

// controlador para obtener todos los productos

export const getProductos=(req, res, next) =>{

    const filtroMarca = formatearFiltrosDB(req.query.marca);
    const filtroEspecies = formatearFiltrosDB(req.query.especies);
    const filtroLineaTerapeutica = formatearFiltrosDB(req.query.lineaTerapeutica);
    const filtroNombre = formatearFiltrosDB(req.query.nombre);

    // creamos un objeto con los filtros que se van a aplicar

    const filtros = {}
    if(filtroLineaTerapeutica) filtros.lineaterapeutica = filtroLineaTerapeutica;
    if(filtroEspecies) filtros.especies = filtroEspecies;
    if(filtroMarca) filtros.marca = filtroMarca;
    if(filtroNombre) filtros.nombre = filtroNombre;

    //buscamos los productos en la base de datos primera duda como hago para
    //tener ambas opciones, listar con y sin filtros
    //chat gpt me sugiere verificar si es la manera o hay otra
    //    // Si no hay ningún filtro, traerá todas las noticias
    //ModeloNoticia.find(Object.keys(filtros).length ? filtros : {})
    //.then((data) => {
    //    console.log("get productos =>", data);
        // Devolvemos las noticias en formato JSON
    //    res.json(data.length ? data : []);
    //})
    //.catch((error) => {
        // Si hay un error, lo pasamos al siguiente middleware
    //    next(error);
    //});

    ModeloProducto.find(filtros, "-precio")
    .then((data)=>{
        //si no hay producto devuelvo vacio
        if(data.length === 0){
            res.json([]);

        }else{
            //si tengo productos lo devolvemos en formato json

            res.json(data)
        }
    })
    .catch((error)=>{
        //si hay error podemos usar el middleware ( que hay que definirlo antes) o simplemente mensahe de error)

        res.SEND("Hubo un error")
    })

}