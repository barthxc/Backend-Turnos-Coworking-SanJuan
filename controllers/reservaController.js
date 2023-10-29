import Reserva from "../models/Reserva.js";

//MOSTRAR RESERVAS
const mostrarReservas = async(req,res)=>{
    try{
        const reservas = await Reserva.find();
        res.json(reservas);
    }catch(error){
        res.status(500).json({msg:error.message});
    }
}

//MOSTRAR RESERVAS POR ID
const mostrarReservasPorId = async (req,res) =>{
    const id = req.params.id;
    console.log(id);
    try {
        const reservas = await Reserva.find({estacionId:id});
        res.json(reservas);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}



//REGISTRAR UNA RESERVA
const registrarReserva = async (req, res) => {
    // Extraer datos del cuerpo de la solicitud
    const {  id, fecha,  nombre, dni, email } = req.body;
    console.log(req.body);

    try {

        const reservaExiste = await Reserva.findOne({estacionId:id,fecha})
        if(reservaExiste){
            return res.status(400).json({msg:'Ya existe una reserva para esta estación en esta fecha.'})
        }


        const reserva = new Reserva({
            estacionId:id,
            fecha:fecha,
            nombre:nombre,
            dni:dni,
            email:email
        })
        await reserva.save();
  
      res.json({ reserva }); // Enviar respuesta exitosa
    } catch (error) {
      // En caso de un error, enviar un mensaje de error con estado 500
      res.status(500).json({ msg: "error interno"});
    }
  };
  
  
  //ELIMINAR RESERVA POR ID
  const eliminarReserva = async (req,res) =>{
    const { id } = req.params;
    console.log(id);

    try {
      const reservaEliminar = await Reserva.findByIdAndDelete(id);
  
      if (!reservaEliminar) {
        return res.status(404).json({ msg: "La reserva no existe" });
      }
  
      res.json({ msg: "Reserva eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ msg: "Error interno del servidor" });
    }
  }








export {
    mostrarReservas,
    mostrarReservasPorId,
    registrarReserva,
    eliminarReserva
}