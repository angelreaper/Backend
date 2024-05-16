const express = require('express');
const authController = require('../controllers/authController');
const {check} = require('express-validator');
const router = express.Router();
const auth = require('../middelwares/authMiddelware');


// autenticación el usuario

//api/auth

router.post('/',[
    check('email','Ingrese un email valido').isEmail(),
    check('password','El password debe ser minimo de 10 caracteres').isLength({min:10})
],authController.autenticarUsuario);
//esto usa primero la función que esta en auth, para validar el token, si no tiene el token , no lo va dejar entrar o consultar el recurso
router.get('/',auth,authController.usuarioAtenticado);


module.exports = router;