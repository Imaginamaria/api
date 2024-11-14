import { ModeloProducto } from "../database/models/ModeloProducto.js";

// controlador para eliminar un producto

export  const deleteProducto = (req, res, next) =>{

    // obtengo el id del producto a eliminar desde los parametros de la consulta
    const idProducto = req.params.id;

    // elimino el producto  con el id proporcionado de la base de datos
    ModeloProducto.deleteOne({id: idProducto})
    .then((data)=>{
        // si no hay producto con ese id tiro un error que será capturado por el catch
        if(data.deletedCount !== 1){
            throw new Error (`No existe producto con el Id ${idProducto}`)
        }else{
            // si tengo producto lo devolvemos en formato json
            res.json({
                message: `Producto con el Id ${idProducto} eliminado con éxito`
            })
        }
    })
    .catch((error)=>{
        // si hay un error, lo paso al siguiente middleware
        next(error);
    })
}