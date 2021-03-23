const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
//resultado de la validacion
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  //revisar si hay errores con expres-validation
  const errores = validationResult(req); //retorna si hay un error
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer el email y el pass
  const { email, password } = req.body;

  try {
    //revisar que sea un user registrado
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    //revisar el password (comparamos(password que pasamos, con el password que esta en la bd))
    const passCorrecto = await bcrypt.compare(password, usuario.password);

    if (!passCorrecto) {
      return res.status(400).json({ msg: "Password Incorrecto" });
    }

    //si toto es correcto creamos el token

    //Crear y Firmarlo al JWT
    const payload = {
      usuario: {
        id: usuario.id, //trabajamos con el id del ususario
      },
    };

    //firmar el jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, //expirara en una hora
      },
      (error, token) => {
        //callback

        if (error) throw error;

        console.log(token);

        //muestro el token como resultado (llave: valor)
        res.json([{ token: token }, { msg: "Usuario creado correctamente" }]);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password"); //select(-password) es para no mostrar ese campo, //el user lo guarda el auth al momento de proteger las rutas
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
