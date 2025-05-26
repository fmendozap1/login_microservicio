const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const authorizeRole= require('../middlewares/autorizacionRole');

//lista de usuarios
router.get('/listall', authMiddleware, authorizeRole(['admin']), usuarioController.listar);
//creacion de usuarios
router.post('/create',authMiddleware, authorizeRole(['admin','Super Administrador']), usuarioController.crear);
//login
router.post('/login', usuarioController.login);
//actualizar
router.put('/update',authMiddleware, authorizeRole(['admin','Super Administrador']), usuarioController.actualizar);
//eliminar
router.delete('/delete',authMiddleware, authorizeRole(['admin','Super Administrador']), usuarioController.eliminar);

//esta ruta es para validar el token
router.get('/validar-token', authMiddleware, (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Token válido',
        user: req.user
    });
});

module.exports = router;