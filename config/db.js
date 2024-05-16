const mongoose = require('mongoose');
require('dotenv').config({path:'.env'});

//conexión con mongodb
const conectarDB = () =>{

    mongoose
    .connect(process.env.DB_MONGO)
    .then(()=> console.log('Conexión exitosa a DB'))
    .catch((err)=> console.error(err));
};

module.exports = conectarDB;