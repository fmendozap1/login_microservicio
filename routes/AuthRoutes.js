const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

//login
router.post('/login', authController.login);

//esta ruta es para validar el token
router.get('/validar-token', authMiddleware, (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Token válido',
        user: req.user
    });
});

module.exports = router;