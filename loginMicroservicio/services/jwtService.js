const jwt = require('jwt-simple');
const moment = require('moment');

const secret = "f@@nc@@ny0n2025"

const createToken = (user) => {
    const payload = {
        id: user.idUsuario,
        name: user.nombre_usuario,
        email: user.email_usuario,
        role: user.role_usuario,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    }

    return jwt.encode(payload,secret);
}

module.exports = {
    secret,
    createToken
}