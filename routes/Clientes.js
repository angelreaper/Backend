const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

//estas son las rutas del crud

router.post('/',clienteController.agregarCliente);
router.get('/',clienteController.consultarClientes);
router.get('/:id',clienteController.consultarCliente);
router.delete('/:id',clienteController.eliminarCliente);
router.put('/:id',clienteController.actualizarCliente);
router.patch('/:id',clienteController.modificarCliente);

// router.get('/',(req,res)=>{
//     res.send('Hola mundo 2');}
// );

module.exports = router;

