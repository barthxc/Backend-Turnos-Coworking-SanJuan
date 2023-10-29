import Reserva from "../models/Reserva.js";

// Función para registrar una reserva
const registrar = async (req, res) => {
  // Extraer datos del cuerpo de la solicitud
  const { nombre, email, idEstacion, fecha, hora, duracion } = req.body;

  try {
    // Validación 1: La fecha debe ser la actual o futura
    const fechaReserva = new Date(fecha);
    const fechaActual = new Date();
    const fechaISO = fechaActual.toISOString().split('T')[0]; // Obtiene solo la parte de la fecha

    console.log(fechaISO);
    if (fechaReserva > fechaISO) {
      return res.status(400).json({
        msg: "La fecha de la reserva debe ser la actual o futura.",
      });
    }

    // Validación 2: La fecha no debe ser en fin de semana
    const diaSemana = fechaReserva.getDay();
    if (diaSemana === 0 || diaSemana === 6) {
      return res.status(400).json({
        msg: "No se permiten reservas en fin de semana.",
      });
    }

    // Validación 3: La estación debe estar disponible en ese día y hora
    const reservasExistente = await Reserva.find({
      estacionId: idEstacion,
      fecha,
      hora,
    });

    if (reservasExistente.length > 0) {
      return res.status(400).json({
        msg: "La estación no está disponible en ese día y hora.",
      });
    }

    // Validación 4: Debe haber al menos 1 hora disponible para la reserva
    const reservasEstacion = await Reserva.find({
      estacionId: idEstacion,
      fecha,
    });

    let horasOcupadas = 0;

    // Sumar las duraciones de las reservas existentes
    reservasEstacion.forEach((reserva) => {
      horasOcupadas += reserva.duracion;
    });

    if (duracion === 2 && horasOcupadas + 1 > 12) {
        return res.status(400).json({
          msg: "El usuario solo tiene 1 hora libre para la reserva.",
        });
      }
      
    if (horasOcupadas + duracion > 12) {
      return res.status(400).json({
        msg: "No hay suficientes horas disponibles para la reserva.",
      });
    }

 

    // Validación 6: El horario de reserva debe estar entre las 8:00 y las 20:00
    const horaReserva = Number(hora.split(":")[0]);

    if (horaReserva < 8 || horaReserva >= 20) {
      return res.status(400).json({
        msg: "El horario de reserva debe estar entre las 8:00 y las 19:00.",
      });
    }

    // Validación 7: No debe excederse el límite de 12 horas de reservas por día
    if (horasOcupadas + duracion > 12) {
      return res.status(400).json({
        msg: "No se pueden reservar más de 12 horas en un día.",
      });
    }

    // Verificar si ya existe una reserva en la misma fecha, hora y estación
    const reservaExistente = await Reserva.findOne({
      estacionId: idEstacion,
      fecha,
      hora,
    });

    if (reservaExistente) {
      return res.status(400).json({
        msg:
          "Ya existe una reserva en la misma fecha y hora para esta estación.",
      });
    }

    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      // Si el usuario no existe, lo creamos
      usuario = new Usuario({ nombre, email });
      await usuario.save();
    }

    // Creamos la reserva
    const reserva = new Reserva({
      estacionId: idEstacion,
      usuarioId: usuario._id,
      fecha,
      hora,
      duracion,
    });

    await reserva.save();

    res.json({ usuario, reserva }); // Enviar respuesta exitosa
  } catch (error) {
    // En caso de un error, enviar un mensaje de error con estado 500
    res.status(500).json({ msg: error.message });
  }
};

export { registrar };
