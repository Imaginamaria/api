import {ModeloArticulo} from "../database/models/ModeloArticulo.js"

//controlador para obtener un producto por su id

export const getArticuloById =  (req, res, next) => {
    // obtengo el id de la url
    const idArticulo = req.params.id;


    ModeloArticulo.findOne({id: idArticulo})
    .then((data)=>{
        //si no hay articulo con ese id tiro un error que sera capturado por el catch
        if(!data){

            throw new Error (`No existe articulo con el Id ${idArticulo}`)
        }else{
            //si tengo articulos lo devolvemos en formato json
            res.json(data)
        }
    })
    .catch((error)=>{
        // si hay un error, lo paso al siguiente middleware
        next(error);
    })
}