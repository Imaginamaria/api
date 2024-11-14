import express from "express";
import "dotenv/config";
import cors from "cors";
import {conectarDB} from"./database/conectarDB.js";
import { getProductos } from "./controllers/getProductos.js";
import { getProductoById } from "./controllers/getProductoById.js";
import { mostrarDatosRequest } from "./middlewares/mostrarDatosRequest.js";
import { manejadorErrores } from "./middlewares/manejadorErrores.js";
import { postProducto } from "./controllers/postProducto.js";
import { deleteProducto } from "./controllers/deleteProducto.js";
import { putProducto } from "./controllers/putProducto.js";

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
app.delete("/producto/:id", deleteProducto);
app.put("/producto/:id", putProducto);

// middleware manejador de errores
app.use(manejadorErrores);

// levantamos el servidor
app.listen(port,()=>{
    console.log(`App corriendo en puerto ${port}`)
})

