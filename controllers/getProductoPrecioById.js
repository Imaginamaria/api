import { ModeloProducto } from "../database/models/ModeloProducto.js";


//controlador para obtener un producto por su id

export const getProductoPrecioById =  (req, res, next) => {
    // obtengo el id de la url
    const idProducto = req.params.id;


    ModeloProducto.findOne({id: idProducto})
    .then((data)=>{
        //si no hay producto con ese id tiro un error que ser'a capturado por el catch
        if(!data){

            throw new Error (`No existe producto con el Id ${idProducto}`)
        }else{
            //si tengo productos lo devolvemos en formato json
            res.json(data)
        }
    })
    .catch((error)=>{
        // si hay un error, lo paso al siguiente middleware
        next(error);
    })
}