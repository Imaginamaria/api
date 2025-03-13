import {ModeloArticulo} from "../database/models/ModeloArticulo.js"

// controlador para eliminar un articulo

export  const deleteArticulo = (req, res, next) =>{

    // obtengo el id del articulo a eliminar desde los parametros de la consulta
    const idArticulo = req.params.id;

    // elimino el articulo  con el id proporcionado de la base de datos
    ModeloArticulo.deleteOne({id: idArticulo})
    .then((data)=>{
        // si no hay articulo con ese id tiro un error que será capturado por el catch
        if(data.deletedCount !== 1){
            throw new Error (`No existe articulo con el Id ${idArticulo}`)
        }else{
            // si tengo articulo lo devolvemos en formato json
            res.json({
                message: `Articulo con el Id ${idArticulo} eliminado con éxito`
            })
        }
    })
    .catch((error)=>{
        // si hay un error, lo paso al siguiente middleware
        next(error);
    })
}