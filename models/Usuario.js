const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true, //elimina los espacios en blanco
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, //que sea el correo unico para que no se repita
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  registro: {
      type: Date,
      default: Date.now() //fecha actual en que se registra
  },
});

//registramos el nombre del modelo(Usuario) con el esquema creado
module.exports = mongoose.model("Usuario", UsuarioSchema);
