import Admin from "../models/Admin.js";

const loginAdmin = async (req, res) => {
  const { usuario, contrasena } = req.body;


  try {
    const admin = await Admin.findOne({ usuario, contrasena });
    console.log(admin);

    if (!admin) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    return res.status(200).json({ mensaje: "Login exitoso", admin });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export { loginAdmin };
