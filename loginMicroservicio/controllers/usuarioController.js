const User = require("../models/usuarioModel");
const bcrypt = require("bcrypt");
const jwt = require("../services/jwtService");
const Usuarios = require("../models/usuarioModel");
const { Op } = require("sequelize");

const crear = async (req, res) => {
  let parametros = req.body;

  try {

     //Encripta la contraseña
    const password_cifrado = await bcrypt.hash(parametros.password_usuario, 10);

    const [usuario,creado] = await Usuarios.findOrCreate({
      where: {
        [Op.or]: [
          { num_identificacion_usuario: num_id },
          { email_usuario: email },
        ],
      },
      default: {
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
        nombres: usuario_nuevo.nombres_usuario,
        email: usuario_nuevo.email_usuario,
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

const login = (req, res) => {
  let params = req.body;
  let user;

  User.findOne({ email: params.email, status: 1 })
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          status: "Error",
          message: "User Not Found",
        });
      }
      let pwd = bcrypt.compareSync(params.password, result.password);
      if (!pwd) {
        return res.status(401).json({
          status: "Error",
          message: "Invalid Username or Password",
        });
      } else {
        user = result;
        const token = jwt.createToken(user);
        return res.status(200).json({
          status: "Success",
          message: "Login Successful",
          user: user.email,
          token,
        });
      }
    });
};

const update = (req, res) => {
  let userIdentity = req.user;
  let userToUpdate = req.body;
  let user; //VARIABLE TO BE READ AFTER PASSWORD VALIDATION

  User.findOne({ _id: userIdentity.id })
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          status: "Error",
          message: "User not found",
        });
      }
      if (userToUpdate.password) {
        bcrypt.hash(userToUpdate.password, 10, (error, pwd) => {
          if (pwd) {
            userToUpdate.password = pwd;
            User.findByIdAndUpdate(userIdentity.id, userToUpdate)
              .exec()
              .then((result) => {
                return res.status(200).json({
                  status: "Success",
                  message: "User and password updated",
                });
              });
          }
        });
      } else {
        User.findByIdAndUpdate(userIdentity.id, userToUpdate)
          .exec()
          .then((result) => {
            return res.status(200).json({
              status: "Success",
              message: "User updated",
            });
          });
      }
    });
};

//INSTEAD OF DELETING THE USER, STATUS IS CHANGED TO 0
const disable = (req, res) => {
  let userToDisable = req.body.email;

  User.findOne({ email: userToDisable })
    .exec()
    .then((result) => {
      if (result) {
        User.findByIdAndUpdate(result._id, { status: 0 })
          .exec()
          .then((disabledUser) => {
            return res.status(200).json({
              status: "Success",
              message: "User was disabled",
              user: disabledUser.email,
            });
          });
      }
    })
    .catch((error) => {
      return res.status(404).json({
        status: "Error",
        message: "User Not Found",
        user: disabledUser.email,
      });
    });
};

//INSTEAD OF READDING THE USER, STATUS IS CHANGED TO 1
const enable = (req, res) => {
  let userToEnable = req.body.email;

  User.findOne({ email: userToEnable })
    .exec()
    .then((result) => {
      if (result) {
        User.findByIdAndUpdate(result._id, { status: 1 })
          .exec()
          .then((enabledUser) => {
            return res.status(200).json({
              status: "Success",
              message: "User was enabled",
              user: enabledUser.email,
            });
          });
      }
    })
    .catch((error) => {
      return res.status(404).json({
        status: "Error",
        message: "User Not Found",
        user: enabledUser.email,
      });
    });
};

//SHOWS PROFILE OF THE CURRENT USER LOGGED IN
const getProfile = (req, res) => {
  let userIdentity = req.user;

  User.findById(userIdentity.id)
    .select({ role: 0, password: 0 })
    .exec()
    .then((result) => {
      if (result) {
        return res.status(200).json({
          status: "Success",
          user: result,
        });
      } else {
        return res.status(404).json({
          status: "Error",
          message: "User not found",
        });
      }
    });
};

const getAll = (req, res) => {
  User.find({})
    .select({ role: 0, password: 0 })
    .exec()
    .then((result) => {
      if (result) {
        return res.status(200).json({
          status: "Success",
          user: result,
        });
      } else {
        return res.status(404).json({
          status: "Error",
          message: "User not found",
        });
      }
    })
    .catch((error) => {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    });
};

module.exports = {
  crear,
  create,
  login,
  update,
  disable,
  enable,
  getProfile,
  getAll,
};
