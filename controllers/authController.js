const jwt = require("../services/jwtService");
const bcrypt = require("bcrypt");

//login
const login = async (req, res) => {
    let parametros = req.body;

    try {
        const usuario_buscado = await Usuarios.findOne({where: {email_usuario: parametros.email_usuario}});

        if (!usuario_buscado) {
            return res.status(404).json({
                status: "Error",
                message: "User Not Found",
            });
        }

        let pwd = bcrypt.compareSync(
            parametros.password_usuario,
            usuario_buscado.password_usuario
        );

        if (!pwd) {
            return res.status(401).json({
                status: "Error",
                message: "Invalid Password",
            });
        }

        const token = jwt.createToken({
            idUsuario: usuario_buscado.idUsuarios,
            nombre_usuario: usuario_buscado.nombres_usuario,
            email_usuario: usuario_buscado.email_usuario,
            role_usuario: usuario_buscado.rol_usuario,
        });
        return res.status(200).json({
            status: "Success",
            message: "Login Successful",
            user: {
                email: usuario_buscado.email_usuario,
                nombres: usuario_buscado.nombres_usuario,
                rol: usuario_buscado.rol_usuario,
            },
            token,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Acceso denegado",
            error: error.message,
        });
    }
};

//exportamos metodos
module.exports = {login};
