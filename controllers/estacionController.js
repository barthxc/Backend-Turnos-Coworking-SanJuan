import Estacion from "../models/Estacion.js";
import Reserva from "../models/Reserva.js";

const mostrarEstaciones = async (req, res) => {
  try {
    // Aquí, puedes usar Mongoose para obtener todas las estaciones desde la base de datos
    const estaciones = await Estacion.find(); // Asumiendo que tienes un modelo llamado Estacion
    res.json(estaciones);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const crearNuevaEstacion = async (req, res) => {
  // Extraer datos del cuerpo de la solicitud
  const { nombre, equipo, contrasena } = req.body;
  console.log(req.body);

  try {
    const estacionExiste = await Estacion.findOne({ nombre });
    if (estacionExiste) {
      return res
        .status(400)
        .json({ msg: "Ya existe una estación con ese nombre." });
    }

    // Crear una nueva instancia de Estacion con los datos proporcionados
    const estacion = new Estacion({
      nombre,
      equipo,
      contrasena: contrasena,
    });
    await estacion.save();
    // Guardar la nueva estación en la base de datos

    res.json({ estacion });
  } catch (error) {
    res.status(500).json({ msg: "error interno" });
  }
};




const modificarEstacionPorId = async (req, res) => {
  const id = req.params.id;
  const { nombre, equipo, contrasena } = req.body;

  try {
    // Verificar si existe una estación con el ID proporcionado
    const estacionExiste = await Estacion.findById(id);

    if (!estacionExiste) {
      return res.status(404).json({ msg: 'Estación no encontrada' });
    }

    // Actualizar los campos según lo proporcionado en el cuerpo de la solicitud
    estacionExiste.nombre = nombre || estacionExiste.nombre;
    estacionExiste.equipo = equipo !== undefined ? equipo : estacionExiste.equipo;
    estacionExiste.contrasena = contrasena !== undefined ? contrasena : estacionExiste.contrasena;

    // Guardar los cambios
    await estacionExiste.save();

    res.json({ msg: 'Estación actualizada correctamente', estacion: estacionExiste });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


const eliminarEstacionPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const estacionEliminada = await Estacion.findByIdAndDelete(id);
    if (!estacionEliminada) {
      return res.status(404).json({ msg: "Estación no encontrada" });
    }

    res.json({ msg: "Estación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};


const mostrarEstacionYReserva = async (req, res) => {
  try {
    const estacionesConReservas = await Estacion.aggregate([
      {
        $lookup: {
          from: 'reservas',
          localField: '_id',
          foreignField: 'estacionId',
          as: 'reservas'
        }
      }
    ]);

    const datosFormateados = estacionesConReservas.map(estacion => {
      return {
        idEstacion: estacion._id,
        nombreEstacion: estacion.nombre,
        equipo: estacion.equipo, // Agregado: incluir el dato de equipo
        contrasena: estacion.contrasena, // Agregado: incluir el dato de contrasena
        reservas: estacion.reservas.map(reserva => ({
          idReserva: reserva._id, // Agregado: incluir el id de la reserva
          nombre: reserva.nombre,
          dni: reserva.dni,
          email: reserva.email,
          telefono:reserva.telefono,
          fecha: reserva.fecha
        }))
      }
    });

    res.json(datosFormateados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//MUESTRA LAS RESERVAS POR EL ID DE LA ESTACION
const mostrarEstacionYReservaPorIdEstacion = async (req, res) => {
  const { id } = req.params;

  try {
    const reservasDeEstacion = await Reserva.find({ estacionId: id });
    const infoEstacion = await Estacion.findById(id);

 

    const datosFormateados = {
      idEstacion:infoEstacion._id,
      nombreEstacion:infoEstacion.nombre,
      equipo:infoEstacion.equipo,
      contrasena:infoEstacion.contrasena,
      reservas: reservasDeEstacion.map(reserva => ({
        idReserva: reserva._id,
        nombre: reserva.nombre,
        dni: reserva.dni,
        email: reserva.email,
        telefono:reserva.telefono,
        fecha: reserva.fecha
      }))
    };

    res.json(datosFormateados);
    console.log(datosFormateados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}







/*
const mostrarEstacionYReserva = async (req,res) =>{
  try {
    const estacionesConReservas = await Estacion.aggregate([
      {
        $lookup: {
          from: 'reservas',
          localField: '_id',
          foreignField: 'estacionId',
          as: 'reservas'
        }
      },
      {
        $unwind: '$reservas'
      },
      {
        $project: {
          idReserva:'$reservas._id',
          nombreEstacion: '$nombre',
          equipo: '$equipo',
          contrasena: '$contrasena',
          reserva: {
            nombre: '$reservas.nombre',
            dni: '$reservas.dni',
            email: '$reservas.email',
            fecha: '$reservas.fecha'
          }
        }
      }
    ]);

    res.json(estacionesConReservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
*/






export { mostrarEstaciones,
         crearNuevaEstacion, 
        modificarEstacionPorId,
        eliminarEstacionPorId,
        mostrarEstacionYReserva,
        mostrarEstacionYReservaPorIdEstacion 
      };
