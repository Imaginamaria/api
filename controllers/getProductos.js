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


    ModeloProducto.find(filtros, "-precio")
    .sort({nombre:'asc'}) //ascendent y descendent ordenar alfabeticamente, precio de menor a mayor, etc
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
    });

};

// Controlador para obtener productos relacionados por línea terapéutica
export const getProductosRelacionados = (req, res, next) => {
    const { lineaTerapeutica } = req.query; // Obtener la línea terapéutica del query

    if (!lineaTerapeutica) {
        return res.status.send("Línea terapéutica es requerida");
    }

    ModeloProducto.find({ lineaterapeutica: lineaTerapeutica })
        .limit(4) // Limitar a 4 productos
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.status.send("Hubo un error al obtener productos relacionados");
        });
};