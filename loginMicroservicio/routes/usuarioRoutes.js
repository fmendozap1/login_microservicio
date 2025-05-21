const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();
//const check = require('../Middlewares/auth');

//router.get('/', userController.prueba);
//router.get('/profile', check.auth, userController.getProfile);
//router.get('/listall', check.auth, userController.getAll);
router.post('/create', usuarioController.crear);
router.post('/login', usuarioController.login);
//router.post('/update', check.auth, userController.update);
//router.post('/disable', check.auth, userController.disable);
//router.post('/enable', check.auth, userController.enable);

module.exports = router;