const {stablish_conection}=require("./db/connection");//conexion base de datos
const routesnote=require("./routes/notesroutes");//rutas
const express=require("express");//uso de express para la creacion del servidor web
const cors=require("cors");//cors para permitir peticiones cruzadas


console.log("Start app")

stablish_conection();

const app=express();//crea una instancia de express
const port=3000;//se define el puerto usualmente el 3000

app.use(cors());//crea la instancia del cors

app.use(express.json());//parsea el cuerpo de las peticiones en json
app.use(express.urlencoded({extended:true}));//parsea los datos del formulario html

app.use("/apinotes",routesnote);//especifica el prefijo de las rutas

//inicia el servidor con el puerto especificado
app.listen(port,()=>{
    console.log("Server start in port "+port);
})