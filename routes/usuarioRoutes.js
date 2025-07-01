const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const authorizeRole= require('../middlewares/autorizacionRole');

//lista de usuarios
router.get('/listall', authMiddleware, authorizeRole(['Administrador',,'Super Administrador']), usuarioController.listar);
//creacion de usuarios
router.post('/create',authMiddleware, authorizeRole(['Administrador','Super Administrador']), usuarioController.crear);
//actualizar
router.put('/update',authMiddleware, authorizeRole(['Administrador','Super Administrador']), usuarioController.actualizar);
//eliminar
router.delete('/delete',authMiddleware, authorizeRole(['Administrador','Super Administrador']), usuarioController.eliminar);

module.exports = router;