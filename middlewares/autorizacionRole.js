// Este middleware recibe un array de roles permitidos
const authorizeRole = (rolesPermitidos = []) => {
    return (req, res, next) => {
        const usuario = req.user; // Aquí llega el payload del token

        if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
            return res.status(403).json({
                status: "Error",
                message: "No tienes permisos para acceder a esta ruta"
            });
        }

        next();
    };
};

module.exports = authorizeRole;
