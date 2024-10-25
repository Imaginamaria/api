import {ModeloProducto} from "../database/models/ModeloProducto.js"

export const getProductos=(req, res, next) =>{
    ModeloProducto.find()
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