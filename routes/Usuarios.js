const express = require('express');
const usuarioContoller = require('../controllers/usuarioController');
const {check} = require('express-validator');
const router = express.Router();

// api/usuarios
router.post('/',[
    check('nombres','ingrese el campo nomnbre').not().isEmpty(),
    check('email','ingrese un email valido').isEmail(),
    check('password','el valor minimo para el password es de 10 caracteres').isLength({min:10})
], usuarioContoller.crearUsuario);

module.exports = router;