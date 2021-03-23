const mongoose = require("mongoose");

const ProyectoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  creador: {
    //AQUI HACEMOS UNA RELACION A LA TABLA USUARIO
    //capturamos el id del usuario como relacion a un proyecto
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario", //nombre del modelo al que perteneci el id de arriba osea a usuario
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Proyecto", ProyectoSchema);
