import Log from "../models/Log.js";

const registrarLog = async(req,res) =>{
    //Extraemos datos del cuerpo de la solicitud
    const {nombreEstacion,equipo,contrasena,fecha,nombrePersona,dniPersona,emailPersona} = req.body;
    console.log(req.body);
    try{
        const log = new Log({
            nombreEstacion,
            equipo,
            contrasena,
            fecha,
            nombrePersona,
            dniPersona,
            emailPersona
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

export {
    registrarLog,
    mostrarLog
}