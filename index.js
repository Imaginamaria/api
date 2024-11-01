import express from "express";
import "dotenv/config";
import cors from "cors";
import {conectarDB} from"./database/conectarDB.js";
import { getProductos } from "./controllers/getProductos.js";
import { getProductoById } from "./controllers/getProductoById.js";
import { mostrarDatosRequest } from "./middlewares/mostrarDatosRequest.js";
import { manejadorErrores } from "./middlewares/manejadorErrores.js";
import { postProducto } from "./controllers/postProducto.js";

const app = express();
app.use(express.json());
app.use(cors());


await conectarDB();

const port=process.env.PORT;

//middleware -> mostrar data requests
app.use(mostrarDatosRequest);

//rutas
app.get("/",(req,res)=>{
    res.send("Hello World 22!")
})

app.get("/productos", getProductos);
app.get("/productos/:id", getProductoById);
app.post("/producto", postProducto);

// middleware manejador de errores
app.use(manejadorErrores);

// levantamos el servidor
app.listen(port,()=>{
    console.log(`App corriendo en puerto ${port}`)
})

