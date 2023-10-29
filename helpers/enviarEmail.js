import sgMail from '@sendgrid/mail';

const enviarEmail = async (datos) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const { contrasena } = datos;
    //Enviar email

    const info = await sgMail.send({
      to: email,
      from: "pbartgal@myuax.com",
      subject: 'Reestablece tu Password',
      text: 'Reestablece tu Password',
      html: `
        <p>Hola ${contrasena}, has solicitado reestablecer tu password.</p>
        <p>Sigue el siguiente enlace para generar tu nuevo password:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a></p>
        <p>Si tu no creaste esta cuenta, ignora este mensaje.</p>
      `
    });

    console.log('Email enviado:', info);
  } catch (error) {
    console.error('Error al enviar el email:', error);
  }
}

export default emailOlvidePassword;
