import express from "express";
import "dotenv/config";
import cors from "cors";
import { conectarDB } from"./database/conectarDB.js";
import { getProductos } from "./controllers/getProductos.js";
import { getProductoById } from "./controllers/getProductoById.js";
import { mostrarDatosRequest } from "./middlewares/mostrarDatosRequest.js";
import { manejadorErrores } from "./middlewares/manejadorErrores.js";
import { postProducto } from "./controllers/postProducto.js";
import { deleteProducto } from "./controllers/deleteProducto.js";
import { putProducto } from "./controllers/putProducto.js";
import { postUsuario } from "./controllers/postUsuario.js";
import { loginUsuario } from "./controllers/loginUsuario.js";
import { controlarSesion } from "./middlewares/controlarSesion.js";
import { logoutUsuario } from "./controllers/logoutUsuario.js";

// creamos la app de express
const app = express();
// usamos express.json para poder leer el body de las peticiones
app.use(express.json());
// habilitamos cors para poder hacer peticiones desde el frontend
app.use(cors());

// conectamos a la base de datos
await conectarDB();

const port=process.env.PORT;

//middleware -> mostrar data requests
app.use(mostrarDatosRequest);

//rutas
app.get("/",(req,res)=>{
    res.send("Api de Laboratorios Pasteur!")
})

// rutas de usuarios
// post -> registrar usuario
app.post("/registrar", postUsuario);
// post -> login usuario
app.post("/login", loginUsuario);
app.get("/productos",getProductos);
app.get("/productos/:id", getProductoById);

// lo pongo por debajo del register y login para que no entre en conflicto
// app.use(controlarSesion);

// lo pongo por debajo del register y login para que no entre en conflicto
app.post("/logout", logoutUsuario);

app.get("/productosConPrecio", getProductos);
app.get("/productosConPrecio/:id", getProductoById);

app.post("/producto", postProducto);
app.delete("/producto/:id", deleteProducto);
app.put("/producto/:id", putProducto);

// middleware manejador de errores
app.use(manejadorErrores);

// levantamos el servidor
app.listen(port,()=>{
    console.log(`App corriendo en puerto ${port}`)
})

