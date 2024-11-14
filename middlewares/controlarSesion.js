import { ModeloUsuario } from "../database/models/ModeloUsuario.js";

// middleware para controlar la sesion de los usuarios

export const controlarSesion = async (req, res, next) =>{
    try{

       // obtengo el auth header de los encabezados de la consulta
        const authHeader = req.headers["authorization"];

        // obtengo el auth header de los encabezados de la consulta
        if(!authHeader){
            // si no encuentro ninguno, devuelvo error
            throw {statusCode: 401, message:"No autorizado - No se envio token de sesion."} 
        }
        // busco usuario con el token del header en la base de datos
        const usuario = await ModeloUsuario.findOne({session: authHeader})

        if(usuario){
            // si hay usuario, lo agrego a la informacion del request, y continuo a la request
            req.usuario = usuario;
            next()
        }else{
            // si no hay usuario con ese session token, devuelvo error
            throw {statusCode: 401, message:"No autorizado - sesion no valida."}
        }
    }catch(error){
        next(error)
    }
}