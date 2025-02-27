import {ModeloArticulo} from "../database/models/ModeloArticulo.js"
import { formatearFiltrosDB } from "../utils/functions.js";

// Función para convertir la fecha de string a objeto Date
const parseFecha = (fechaStr) => {
    const meses = { 
        "enero": 0, "febrero": 1, "marzo": 2, "abril": 3, "mayo": 4, "junio": 5, 
        "julio": 6, "agosto": 7, "septiembre": 8, "octubre": 9, "noviembre": 10, "diciembre": 11 
    };
    if (!fechaStr) return null; // Evitar errores con fechas nulas o vacías

    const [dia, mes, año] = fechaStr.split(" de ");
    return new Date(año, meses[mes.toLowerCase()], dia);
};

// controlador para obtener todos los articulos
export const getArticulos = (req, res, next) => {
    
    const filtroTitulo = formatearFiltrosDB(req.query.titulo);
    const filtroFecha = formatearFiltrosDB(req.query.fecha);
    const filtroTemas = formatearFiltrosDB(req.query.temas);
    const filtroEspecies = formatearFiltrosDB(req.query.especies);

    // creamos un objeto con los filtros que se van a aplicar

    const filtros = {}
    if(filtroTitulo) filtros.titulo = filtroTitulo;
    if(filtroFecha) filtros.fecha = filtroFecha;
    if(filtroTemas) filtros.temas = filtroTemas;
    if(filtroEspecies) filtros.especies = filtroEspecies;
    
    ModeloArticulo.find(filtros) 
       
    .then((data)=>{
        //si no hay articulo devuelvo vacio
        if(data.length === 0){
            res.json([]);

        }else{
            // Ordenamos los artículos por fecha de forma descendente (más recientes primero)
            data.sort((a, b) => parseFecha(b.fecha) - parseFecha(a.fecha));

            //devolvemos los articulos en formato json
            res.json(data);
        }
    })
    .catch((error)=>{
        // si hay un error, lo paso al siguiente middleware
        next(error);
    });
};

// Controlador para obtener articulos relacionados por especie
export const getArticulosRelacionados = (req, res, next) => {
    const { especies } = req.query; // Obtener la especie del query

    if (!especies) {
        return res.status(400).send("La especie es requerida");
    }

    ModeloProducto.find({ especies: especies })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.status(500).send("Hubo un error al obtener articulos relacionados");

        });
};