import express from "express"
import "dotenv/config"
import cors from "cors"
import {conectarDB} from"./database/conectarDB.js";
import { getProducto } from "./controllers/getProducto.js";
import { postProducto } from "./controllers/postProducto.js";

const app = express();
app.use(express.json());
app.use(cors());


await conectarDB();

const port=process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Hello World 22!")
})

app.get("/productos", getProducto)

// middleware manejador de errores
app.use(manejadorErrores);

// levantamos el servidor
app.listen(port,()=>{
    console.log(`App corriendo en puerto ${port}`)
})

