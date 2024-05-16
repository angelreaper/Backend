const Usuarios = require('../models/Usuarios');
const bcrypts = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


exports.crearUsuario = async (req,res)=>{

    const errores = validationResult(req);//aquí se dispara el validator

    if (!errores.isEmpty()) {

        return res.status(400).json({errores:errores.array()});
    }
    //si no hay errores

    const {email,password} = req.body;

    try {
        //verificamos que el usuario este registrado
        let usuario = await Usuarios.findOne({email});
        if (usuario) {
            return res.status(400).json({msg:'El usuario ya existe'});
        }

        //creación el usuario 

        usuario = new Usuarios(req.body);

        usuario.password = await bcrypts.hash(password,12);//encriptamos la clave

        //guardamos el usuario
         await usuario.save();

        //firmamos el jwt
         // si es correcto se crea la forma del token
         const payload= {
            usuario: {id:usuario.id}
        };
        //armamos el token
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn:3600
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
        res.status(400).send('Ocurrio un error inesperado en Usuario');

    }
}