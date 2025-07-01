require('dotenv').config();
const {stablish_conection}=require("./db/connection");//conexion base de datos
const routesUsuarios=require("./routes/usuarioRoutes");//rutas
const routesauth=require("./routes/AuthRoutes");//rutas
const express=require("express");//uso de express para la creacion del servidor web
const cors=require("cors");//cors para permitir peticiones cruzadas Cross-Origin Resource Sharing


console.log("Start app")

console.log("DB:", process.env.DB);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

stablish_conection();

const app=express();//crea una instancia de express
const port=process.env.PORT;//se define el puerto usualmente el 3000

app.use(cors());//crea la instancia del cors

app.use(express.json());//parsea el cuerpo de las peticiones en json
app.use(express.urlencoded({extended:true}));//parsea los datos del formulario html

app.use("/api/usuarios",routesUsuarios);//especifica el prefijo de las rutas
app.use("/api/auth",routesauth);//especifica el prefijo de las rutas

//inicia el servidor con el puerto especificado
app.listen(port,()=>{
    console.log("Server start in port "+port);
})