import mongoose from "mongoose";


const url= process.env.MONGO_URL

export const conectarDB=()=>{

    return mongoose.connect(url)
    .then(()=>{
        //si la conexion es exitosa mostramos mensaje en consola
        console.log("Conectando a la DB!")
    })
    .catch((error)=>{
        // si hay un error lo mostramos en la consola
        console.log("Error conectando a la DB:", error)
    })

    
}