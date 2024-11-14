import {ModeloUsuario} from "../database/models/ModeloUsuario.js";

// controlador para loguear un usuario

export const loginUsuario = async (req, res, next) =>{
    const {email, password} = req.body;
    // busco un usuario con ese email y password
    const usuario = await ModeloUsuario.findOne({email, password})
    // busca un usuario con el email y contraseña que llega en el body
    if(usuario){
        // crear y guardar el token
        usuario.session = Math.random().toString(36).slice(2);
        // guardo el token de sesion en la base de datos
        usuario.save()
        .then(()=>{
                    // devolver el token (y el user para usarlo en el frontend)
            res.json({session: usuario.session, user: usuario})
        })
        .catch((error)=> {
            next(error)
        })
    }else{
         // si no hay un usuario con ese email y password, devuelvo un error
        next(new Error("Usuario o contraseña incorrecta."))
    }
}

