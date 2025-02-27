import {ModeloArticulo} from "../database/models/ModeloArticulo.js"


export const putArticulo = (req, res, next) => {

    //obtengo el id de la noticia a modificar desde los parametros de la consulta

    const idArticulo = req.params.id;

    //obtengo los datos del producto desde el cuerpo de la consulta
    const {
        titulo,
        colgado,
        descripcion,
        destacado,
        detalle,
        fecha,
        imagen,
        especie,
        temas,
    } = req.body;
    
    const datosNuevos = {};

    if(titulo) datosNuevos.titulo = titulo;
    if(colgado) datosNuevos.colgado = colgado;
    if(descripcion) datosNuevos.descripcion = descripcion;
    if(destacado) datosNuevos.destacado = destacado;
    if(detalle) datosNuevos.detalle = detalle;
    if(fecha) datosNuevos.fecha = fecha;
    if(imagen) datosNuevos.imagen = imagen;
    if(especie) datosNuevos.especie = especie;
    if(temas) datosNuevos.temas = temas;

    //modifico el producto con el id proporcionado
    ModeloArticulo.updateOne({id: idArticulo}, datosNuevos)
    .then((data) =>{
        if(data.matchedCount === 0){
            throw new Error(`No existe articulo con el id ${idArticulo}`)
        }
        res.json({message: `Articulo con el id ${idArticulo} actualizado con éxito`})
    })
    .catch((error) =>{
        next ( error)
    })
}