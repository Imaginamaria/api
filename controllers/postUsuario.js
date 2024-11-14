import { ModeloUsuario } from "../database/models/ModeloUsuario.js";
import { obtenerProximoId } from "../utils/functions.js";

// controlador para agregar un usuario
export const postUsuario = async (req, res, next) => {

    const {
        nombre,
        apellido,
        email,
        password,
        localidad,
        telefono,
        veterinaria,
        session
    } = req.body;
    
    try{

        // verificamos si ya existe un usuario con ese email
        const usuarioExistente = await ModeloUsuario.findOne({ email: email });
        // si existe, tiro error
        if (usuarioExistente) {
            throw new Error("El usuario ya existe");
        }
        
        // si no existe, creamos un nuevo usuario

        const nuevoUsuario = new ModeloUsuario();
        nuevoUsuario.id = await obtenerProximoId(ModeloUsuario);
        nuevoUsuario.nombre = nombre;
        nuevoUsuario.apellido = apellido;
        nuevoUsuario.email = email;
        nuevoUsuario.password = password;
        nuevoUsuario.localidad = localidad;
        nuevoUsuario.telefono = telefono;
        nuevoUsuario.veterinaria = veterinaria;

        //guardo el usuario en la base de datos

        nuevoUsuario.save()
        .then (()=>{
            res.json({message: `Nuevo usuario con id ${nuevoUsuario.id} creado con exito.`})
        })
        .catch((error)=>{
            next(error)
        })
    }catch(error){
        next(error)
    }

    
}