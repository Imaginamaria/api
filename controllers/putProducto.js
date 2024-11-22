import {ModeloProducto} from "../database/models/ModeloProducto.js"


export const putProducto = (req, res, next) => {

    //obtengo el id de la noticia a modificar desde los parametros de la consulta

    const idProducto = req.params.id;

    //obtengo los datos del producto desde el cuerpo de la consulta
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
        precio,
        zafra
    } = req.body;
    
    const datosNuevos = {};

    if(nombre) datosNuevos.nombre = nombre;
    if(colgado) datosNuevos.colgado = colgado;
    if(informacion) datosNuevos.informacion = informacion;
    if(dosificacion) datosNuevos.dosificacion = dosificacion;
    if(composicion) datosNuevos.composicion = composicion;
    if(tiempos) datosNuevos.tiempos = tiempos;
    if(especies) datosNuevos.especies = especies;
    if(presentacion) datosNuevos.presentacion = presentacion;
    if(registro) datosNuevos.registro = registro;
    if(imagen) datosNuevos.imagen = imagen;
    if(advertencias) datosNuevos.advertencias = advertencias;
    if(recomendaciones) datosNuevos.recomendaciones = recomendaciones;
    if(calculadora) datosNuevos.calculadora = calculadora;
    if(lineaterapeutica) datosNuevos.lineaterapeutica = lineaterapeutica;
    if(marca) datosNuevos.marca = marca;
    if(precio) datosNuevos.precio = precio;
    if(zafra) datosNuevos.zafra = zafra;

    //modifico el producto con el id proporcionado
    ModeloProducto.updateOne({id: idProducto}, datosNuevos)
    .then((data) =>{
        if(data.matchedCount === 0){
            throw new Error(`No existe producto con el id ${idProducto}`)
        }
        res.json({message: `Producto con el id ${idProducto} actualizado con éxito`})
    })
    .catch((error) =>{
        next ( error)
    })
}