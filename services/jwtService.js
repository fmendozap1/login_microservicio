const jwt = require('jwt-simple');
const moment = require('moment');

/*
1. escribir en la consola node
2. digitar lo siguiente: require('crypto').randomBytes(32).toString('hex')
*/
const secret = process.env.SECRET_KEY

const createToken = (user) => {
    const payload = {
        id: user.idUsuario,
        sub: user.email_usuario,
        name: user.nombre_usuario,
        rol: user.role_usuario,
        iat: moment().unix(),
        exp: moment().add(1, "days").unix()
    }

    return jwt.encode(payload,secret);
}

module.exports = {
    secret,      
    createToken
}