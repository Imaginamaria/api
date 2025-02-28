import { ModeloArticulo } from "../database/models/ModeloArticulo.js";
import { formatearFiltrosDB } from "../utils/functions.js";

// Función para convertir la fecha de string a objeto Date
const parseFecha = (fechaStr) => {
    if (!fechaStr || !fechaStr.includes(" de ")) return null;

    const meses = { 
        "enero": 0, "febrero": 1, "marzo": 2, "abril": 3, "mayo": 4, "junio": 5, 
        "julio": 6, "agosto": 7, "septiembre": 8, "octubre": 9, "noviembre": 10, "diciembre": 11 
    };

    const partes = fechaStr.split(" de ");
    if (partes.length !== 3) return null;

    const [dia, mes, año] = partes;
    return new Date(año, meses[mes.toLowerCase()], Number(dia));
};

// Controlador para obtener todos los artículos
export const getArticulos = (req, res, next) => {
    const filtroTitulo = formatearFiltrosDB(req.query.titulo);
    const filtroFecha = formatearFiltrosDB(req.query.fecha);
    const filtroTemas = formatearFiltrosDB(req.query.temas);
    const filtroEspecie = formatearFiltrosDB(req.query.especie); // 🔧 Usar "especie" en singular

    // Creación del objeto de filtros
    const filtros = {};
    if (filtroTitulo) filtros.titulo = filtroTitulo;
    if (filtroFecha) filtros.fecha = filtroFecha;
    if (filtroTemas) filtros.temas = filtroTemas;
    if (filtroEspecie) filtros.especie = filtroEspecie; // 🔧 Usar "especie" en singular

    ModeloArticulo.find(filtros)
        .then((data) => {
            if (data.length === 0) {
                return res.json([]);
            }

            // Ordenamos los artículos por fecha de forma descendente
            data.sort((a, b) => parseFecha(b.fecha) - parseFecha(a.fecha));

            res.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

// Controlador para obtener artículos relacionados por especie
export const getArticulosRelacionados = (req, res, next) => {
    const { especie } = req.query;

    if (!especie) {
        return res.status(400).send("La especie es requerida");
    }

    ModeloArticulo.find({ especie: especie }) // 🔧 Usar "especie" en singular
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.status(500).send("Hubo un error al obtener artículos relacionados");
        });
};
