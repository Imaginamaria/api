import { ModeloUsuario } from "../database/models/ModeloUsuario.js"

// controlador para cerrar la sesion de un usuario
export const logoutUsuario = async (req, res, next) =>{
    const token = req.headers["authorization"]
// obtenemos el token de los headers

    const usuario = await ModeloUsuario.findOne({session: token});
// buscamos usuario que tenga ese token como session
    if(usuario) {
        // si encontramos uno, lo borramos el session token, guardamos, y retornamos que salio todo bien
        usuario.session = null;
        await usuario.save();
        // devolvemos un mensaje de exito
        res.json({message: "¡Sesion cerrada con exito!"})
    }else{
        // si no encontramos el usuario, devolvemos un error
        next(new Error("No se encontro el usuario."))
    }
}