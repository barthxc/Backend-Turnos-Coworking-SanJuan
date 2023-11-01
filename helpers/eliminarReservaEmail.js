import sgMail from '@sendgrid/mail';

const eliminarReservaEmail = async ({fecha, nombre, email}) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    //Enviar email
    const info = await sgMail.send({
      to: email,
      from: "pbartgal@myuax.com",
      subject: 'Reserva eliminada',
      text: 'Reserva eliminada',
      html: `
        <h1>Coworking SanJuan</h>
        <p>Hola ${nombre}! se eliminó tu reserva en nuestro Coworking</p><br>
        <p>Para el día: ${fecha}</p><br>
        <p>Para más información haz click <a href="https://sj.sanjuan.gob.ar">aquí!</a></p><br>
        <p>Si no creaste esta reserva, ignora este mensaje</p>
      `
    });

    console.log('Email enviado:', info);
  } catch (error) {
    console.error('Error al enviar el email:', error);
  }
}

export default eliminarReservaEmail;
