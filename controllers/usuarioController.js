
const Usuarios = require("../models/usuarioModel.js");
const { Op } = require("sequelize");

//crear usuario
const crear = async (req, res) => {
  let parametros = req.body;

  try {
    //Encripta la contraseña
    const password_cifrado = await bcrypt.hash(parametros.password_usuario, 10);

    const [usuario, creado] = await Usuarios.findOrCreate({
      where: {
        [Op.or]: [
          { num_identificacion_usuario: parametros.num_identificacion_usuario },
          { email_usuario: parametros.email_usuario },
        ],
      },
      defaults: {
        nombres_usuario: parametros.nombres_usuario,
        tipo_identificacion_usuario: parametros.tipo_identificacion_usuario,
        num_identificacion_usuario: parametros.num_identificacion_usuario,
        email_usuario: parametros.email_usuario,
        password_usuario: password_cifrado,
        rol_usuario: parametros.rol_usuario,
        estado_usuario: parametros.estado_usuario,
      },
    });

    if (!creado) {
      return res.status(400).json({
        status: "Failed",
        message: "El usuario ya existe.",
      });
    }

    // Respuesta exitosa
    return res.status(200).json({
      status: "Proceso Exitoso",
      message: "Usuario Registrado Satisfactoriamente",
      user: {
        nombres: usuario.nombres_usuario,
        email: usuario.email_usuario,
      },
    });
  } catch (error) {
    //error general
    return res.status(500).json({
      status: "Error",
      message: "No fue posible agregar el usuario",
      error: error.message,
    });
  }
};

//Actualizar
const actualizar= async (req,res)=>{

  //definimos variables a utilizar
  let parametros=req.body;
  const name= parametros.nombres_usuario;
  const email=parametros.email_usuario;
  const password=parametros.password_usuario;
  const rol=parametros.rol_usuario;
  const estado=parametros.estado_usuario;

  try {
    //buscamos al usuario por medio del correo electronico
    const usuario_buscado = await Usuarios.findOne({where: { email_usuario: email }});
    
    if (!usuario_buscado) {
      return res.status(404).json({
        status: "Error",
        message: "User Not Found",
      });
    }

    //creamos los nuevos valores
    const nuevos_valores= {}

    if(name){
      nuevos_valores.nombres_usuario=name;
    }
    if(rol){
      nuevos_valores.rol_usuario=rol;
    }
    if(estado){
      nuevos_valores.estado_usuario=estado;
    }
    if(password){
      nuevos_valores.password_usuario= await bcrypt.hash(password, 10);
    }

    //remplaza o modifica los valores del primer parametro con los del segundo parametro
    Object.assign(usuario_buscado,nuevos_valores);
    //valido si se presentan cambios esto retorna un True or false
    const modificacion=usuario_buscado.changed();

    if(!modificacion || modificacion.length ===0){
      return res.status(200).json({
        status: "Success",
        message: "No se detectaron cambios para actualizar",
        data: usuario_buscado // Opcional: devolver datos actuales
      });
    }

    //aqui es donde se guarda una vez se realizo la comprobacion de que se realizaron cambios sobre el usuario buscado
    await usuario_buscado.save();

    return res.status(200).json({
      status: "Success",
      message: "Usuario Actualizado",
      user: {
        email: usuario_buscado.email_usuario,
        nombres: usuario_buscado.nombres_usuario,
        rol: usuario_buscado.rol_usuario,
      }
    });
    
  } catch (error) {
    //error general
    return res.status(500).json({
      status: "Error",
      message: "No fue posible agregar el usuario",
      error: error.message,
    });
  }
}


//listar
const listar = async (req, res) => {
  try {
    const listado= await Usuarios.findAll();
    if(!listado || listado.length==0){
       return res.status(404).json({
        status: "Error",
        message: "No se encontraron usuarios.",
        data: usuario_buscado // Opcional: devolver datos actuales
      });
    }

     return res.status(200).json({
        status: "Success",
        message: "Listado Generado Exitosamente",
        data: listado // Opcional: devolver datos actuales
      });

  } catch (error) {
     //error general
    return res.status(500).json({
      status: "Error",
      message: "No fue posible listar los usuario",
      error: error.message,
    });
  }
};

//eliminar
const eliminar = async(req,res)=>{
  try {
    let parametros=req.body;
    const usuarioEliminar= await Usuarios.findOne({where:{email_usuario:parametros.email_usuario}});
    if(!usuarioEliminar){
       return res.status(404).json({
        status: "Error",
        message: "No se encontro el usuario.",
        data: usuario_buscado // Opcional: devolver datos actuales
      });
    }

    //eliminar usuario el force garantiza que en realidad se elimina el registro
    await usuarioEliminar.destroy(({ force: true }));

    return res.status(200).json({
        status: "Success",
        message: "Usuario Eliminado Exitosamente"
      });

  } catch (error) {
     //error general
    return res.status(500).json({
      status: "Error",
      message: "No fue posible Eliminar el usuario",
      error: error.message,
    });
  }
}

//exportamos metodos
module.exports = {
  crear,
  actualizar,
  listar,
  eliminar
};
