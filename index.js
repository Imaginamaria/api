import express from "express"
import "dotenv/config"
import cors from "cors"
import {conectarDB} from"./database/conectarDB.js";
import { getProductos } from "./controllers/getProductos.js";

const app = express();
app.use(express.json());
app.use(cors());


await conectarDB();

const port=process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Hello World 22!")
})

app.get("/productos", getProductos)

app.listen(port,()=>{
    console.log(`App corriendo en puerto ${port}`)
})

