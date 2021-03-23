const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
//resultado de la validacion
const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  //revisar si hay errores con expres-validation
  const errores = validationResult(req); //retorna si hay un error
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer email y password
  const { email, password } = req.body;

  try {
    //Revisar que el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    //crea el nuevo objeto de usuario
    usuario = new Usuario(req.body); //le insertamos a modelo(esquema) de Usuario el body(registro del usuario)

    //Hashear el password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt); //genera la rescribicion del password y guardo eso

    //guardar usuario
    await usuario.save();

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

    //mensaje de exito
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error"); //enviamos el status de error
  }
};
