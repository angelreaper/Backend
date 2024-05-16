const Usuarios = require('../models/Usuarios');
const bcrypts = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


//funcion autenticar usuario

exports.autenticarUsuario = async (req,res)=>{

    //revisamos la validación si encontramos errores

    const errores=validationResult(req);

    if (!errores.isEmpty()) {

        //esto suelta un error de validación
        return res.status(400).json({errores:errores.array()});
    }
    //si no hay errores

    const {email,password} = req.body;

    try {
        //verificamos que el usuario este registrado
        let usuario = await Usuarios.findOne({email});
        if (!usuario) {
            return res.status(400).json({msg:'El usuario no existe'});
        }
        //verificamos el password comparando
        let passok = await bcrypts.compare(password, usuario.password);
        if (!passok) {
            return res.status(400).json({msg:'La contraseña es incorrecta'});
        }

        // si es correcto se crea la forma del token
        const payload= {
            usuario: {id:usuario.id}
        };
        //armamos el token
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn:43200
            },
            (error,token)=>{
                if (error) throw error;
                //si todo esta ok devolvemos el token
                res.json({token});
            }
        );

    } catch (error) {
        console.log('ocurrio un error');
        console.log(error);
        res.status(400).send('Ocurrio un error inesperado en autenticarUsuario');

    }

}

exports.usuarioAtenticado = async (req,res)=>{
    try {
        //verificamos que el usuario este registrado
        let usuario = await Usuarios.findById(req.usuario.id);
        if (!usuario) {
            return res.status(400).json({msg:'El usuario no existe'});
        }
        res.json({usuario});
       

    } catch (error) {
        console.log('ocurrio un error');
        console.log(error);
        res.status(400).send('Ocurrio un error inesperado en usuarioAtenticado');

    }

}