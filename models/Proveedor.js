const mongoose = require('mongoose');

//modelo de base de datos
const proveedorSchema = mongoose.Schema({

    razonSocial:{
        type: String,
        required:true
    },
    nit:{
        type: Number,
        required:true
    },
    correo:{
        type: String,
        required:true
    },
    telefono:{
        type: Number,
        required:true
    },
    direccion:{
        type: String,
        required:true
    }

},{versionkey:false});

module.exports = mongoose.model('Proveedor',proveedorSchema);