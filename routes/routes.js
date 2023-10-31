import express from 'express';
import { mostrarEstaciones,crearNuevaEstacion, modificarEstacionPorId,eliminarEstacionPorId, mostrarEstacionYReserva, mostrarEstacionYReservaPorIdEstacion  } from '../controllers/estacionController.js';
import { mostrarReservas, mostrarReservasPorId, registrarReserva,eliminarReserva } from '../controllers/reservaController.js';
import { registrarLog , mostrarLog, agregarMensajeLog} from '../controllers/logController.js';
const router = express.Router();

// Ruta principal
router.get('/inicio',mostrarEstaciones); //Muestra las estaciones 
router.post('/inicio',registrarReserva ); //Registrar una reserva

//Reservas
router.get('/reservas', mostrarReservas);
router.delete('/reservas/:id',eliminarReserva);

// CRUD de las estaciones
router.post('/estaciones',crearNuevaEstacion); //Crea una estación
router.patch('/estaciones/:id', modificarEstacionPorId ); //Modifica una estación
router.delete('/estaciones/:id', eliminarEstacionPorId); //Elimina una estación
router.get('/estaciones-con-reservas',mostrarEstacionYReserva);
router.get('/estaciones-reservas-id/:id', mostrarEstacionYReservaPorIdEstacion);


//LOGS
router.get('/log',mostrarLog);
router.post('/log', registrarLog); //Registrar el Log cuando se hace la reserva
router.patch('/log/:id', agregarMensajeLog ); //Modifica un Log agregando un mensaje o anotación





router.get('/reservas/:id',mostrarReservasPorId) //dato dinamico para enviar por ID las reservas


/*
router.get('/reservas', mostrarReservas); //AdministrarReservas
*/
router.delete('/reservas'); //(Eliminarlas)

router.get('/logs'); //NO MODIFICAR LOGS. Crear filtros




export default router;