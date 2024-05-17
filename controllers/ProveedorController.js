const Proveedor  = require('../models/Proveedor');//llamamos el modelo
//Funcion agregar Proveedor
exports.agregarProveedor = async(req,res)=>{

    try {

        let proveedor;
        proveedor = new Proveedor(req.body);
        await proveedor.save();
        res.send(proveedor);

    } catch (error) {
        console.log(error);

        res.status(500).send('hubo un error al agregar un Proveedor');
        
        
        
    }
}

//Función buscar Proveedors
exports.consultarProveedores = async(req,res)=>{
    try {

        let ProveedorRes = [];
        ProveedorRes = await Proveedor.find();
        res.json({Proveedores:ProveedorRes})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error al consultar Proveedor');
    }
}

exports.consultarProveedor = async(req,res)=>{
    try {

        let proveedor;
        proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) {
            res.status(404).json({msg:'Proveedor no encontrado por el id consultado'})
        }
        res.json(proveedor);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error al consultar Proveedor');
    }
}

exports.eliminarProveedor = async(req,res)=>{
    try {

        let proveedor;
        proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) {
            res.status(404).json({msg:'Proveedor no existe'})
            return;
        }
        //await Proveedor.findOneAndRemove({_id:req.params.id});
        await Proveedor.findOneAndDelete({_id:req.params.id});
        res.json({msg:'El Proveedor fue elimnado correctamente'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error al eliminar Proveedor');
    }
}

exports.actualizarProveedor = async(req,res)=>{
    try {
        const {razonSocial,nit,correo,telefono,direccion} = req.body;//asginamos los campos a actualizar del cuerpo de la petición
        let proveedor;
        proveedor = await Proveedor.findById(req.params.id);
        if (!Proveedor) {
            res.status(404).json({msg:'Proveedor no existe'});
            return;
        }else{
            
            proveedor.razonSocial = razonSocial;
            proveedor.nit = nit;
            proveedor.correo = correo;
            proveedor.telefono = telefono;
            proveedor.direccion = direccion;
            proveedor = await Proveedor.findOneAndUpdate({_id:req.params.id},proveedor,{new:true});//se actualiza el parametro
            res.json({msg:'El Proveedor fue actualizado correctamente'});
            //res.json(Proveedor);
            
        }
        
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error al actualizar Proveedor');
    }
}

exports.modificarProveedor = async(req,res)=>{
    try {

        let proveedor;
        proveedor = await Proveedor.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if (!proveedor) {
            res.status(404).json({msg:'Proveedor no existe'});
            return;
        }else{
            res.json(proveedor);
            
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error al actualizar Proveedor');
    }
}