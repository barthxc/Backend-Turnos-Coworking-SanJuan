import twilio from "twilio";


const eliminarReservaMensaje = async ({fecha, nombre, telefono}) => {
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;


  const client = twilio(accountSid,authToken);

  const mensaje = `SanJuanCoworking\n
  Hola ${nombre}!\n
  se ha eliminado la reserva con la fecha: ${fecha}.\n
  Si no creaste esta reserva, ignora este mensaje`;

  client.messages
    .create({
      body: mensaje,
      from: "+16194302393",
      to: telefono,
    })
    .then((message) => console.log(`Mensaje enviado: ${message.sid}`))
    .catch((error) =>
      console.log(`error al enviar el mensaje: ${error}`)
    );
    
};

export default eliminarReservaMensaje;
