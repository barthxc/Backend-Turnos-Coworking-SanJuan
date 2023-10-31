import Log from "../models/Log.js";

const registrarLog = async(req,res) =>{
    //Extraemos datos del cuerpo de la solicitud
    const {nombreEstacion,equipo,contrasena,fecha,nombrePersona,dniPersona,emailPersona,telefono, idReserva} = req.body;
    console.log(req.body);
    try{
        const log = new Log({
            idReserva,
            nombreEstacion,
            equipo,
            contrasena,
            fecha,
            nombrePersona,
            dniPersona,
            emailPersona,
            telefono
        })
        await log.save();
        res.json({log});
    } catch(error){
        res.status(500).json({msg:'error interno'});
    }
}

const mostrarLog = async (req,res) =>{
    try{
        const logs = await Log.find();
        res.json(logs);
    }catch(error){
        res.status(500).json({msg:error.message});
    }
}

const agregarMensajeLog = async (req,res) =>{
    const id = req.params.id;
    const {mensaje} = req.body;
    console.log(mensaje);

    try {
        const logExistente = await Log.findById(id);

        logExistente.mensaje = mensaje;

        await logExistente.save();
        
        res.json({logExistente});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }

}


export {
    registrarLog,
    mostrarLog,
    agregarMensajeLog
}