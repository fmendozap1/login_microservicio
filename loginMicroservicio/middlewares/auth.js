const jwt = require('jwt-simple');
const moment = require('moment');
const { secret } = require('../services/jwtService');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({
            status: 'Error',
            message: 'No authorization header found'
        });
    }

    const token = authHeader.replace(/['"]+/g, '');

    try {
        const payload = jwt.decode(token, secret);

        // Verificamos si el token ha expirado
        const now = moment().unix();
        if (payload.exp <= now) {
            return res.status(401).json({
                status: "Error",
                message: "Token has expired"
            });
        }

        // Guardamos el usuario en la petición
        req.user = payload;
        next();

    } catch (error) {
        return res.status(401).json({
            status: "Error",
            message: "Invalid token",
            error: error.message
        });
    }
};

module.exports = authMiddleware;