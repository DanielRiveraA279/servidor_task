const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //leer el token del header
  const token = req.header("x-auth-token");
  console.log(token);

  //revisar si no hay token al hacer cualquier peticion http(get, post, etc.PropTypes.any,)
  if (!token) {
    return res.status(401).json({ msg: "No hay Token, permiso no vàlido" });
  }

  //validar el token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    req.usuario = cifrado.usuario; //desifro el ID del usuario y guardamos todos los datos del usuario una vez autenticado
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no vàlido" });
  }
};
