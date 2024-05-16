const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    //leer token
    const token = req.header('x-auth.token');
    //console.log('el request',req.rawHeaders);
    //revisar el token

    if(!token){
        return res.status(400).json({msg:'es necesario un token'});
    }
    //validar el token
    try {
        const cifrado = jwt.verify(token,process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        return res.status(400).json({msg:'token no es valido'});
        
    }

}