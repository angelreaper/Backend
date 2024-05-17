const express = require('express');
const router = express.Router();
const ProveedorController = require('../controllers/ProveedorController');

//estas son las rutas del crud

router.post('/',ProveedorController.agregarProveedor);
router.get('/',ProveedorController.consultarProveedores);
router.get('/:id',ProveedorController.consultarProveedor);
router.delete('/:id',ProveedorController.eliminarProveedor);
router.put('/:id',ProveedorController.actualizarProveedor);
router.patch('/:id',ProveedorController.modificarProveedor);

// router.get('/',(req,res)=>{
//     res.send('Hola mundo 2');}
// );

module.exports = router;

