const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

//crea una tarea nueva
exports.crearTarea = async (req, res) => {
  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array(),
    });
  }

  //Extraer el proyecto y comprobar si existe
  const { proyecto } = req.body;

  try {
    const Existeproyecto = await Proyecto.findById(proyecto);
    if (!Existeproyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //revisar si el proyecto actual pertenece al ususario autenticado
    if (Existeproyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//obtiene las tareas por proyecto
exports.obtenerTareas = async (req, res) => {
  try {
    //extraer el proyecto y comprobar si existe
    const { proyecto } = req.query; //req.body(cuando se utiliza params en el front para enviar un parametro se utiliza req.query y si no req.body);

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //revisar ssi el proyecto actual pertenee al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //obtener tareas por proyecto
    const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 }); //sort({campo: -1}) cambia el orden de los registros //where proyecto==proyecto(desestructurado)
    res.json({ tareas }); //enviamos tareas por json
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//actualizar tarea
exports.actualizarTarea = async (req, res) => {
  try {
    //extraer el proyecto y comprobar si existe
    const { proyecto, nombre, estado } = req.body;

    //comprobar si la tarea existe o no (NOTA: se utiliza let para que sea cambiado valor con await en las siguientes lineas de codigo)
    let tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(404).json({ msg: "No existe esa tarea" });
    }

    //extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    //revisar ssi el proyecto actual pertenee al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //crear un obj con la nueva informacion
    //crear un objeto con la nueva informacion
    const nuevaTarea = {};
    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    //guardar la tarea modificada con su nuevo objeto
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });
    
    res.json({ tarea });

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//eliminar tarea
exports.eliminarTarea = async (req, res) => {
  try {
    //extraer el proyecto y comprobar si existe
    const { proyecto } = req.query; //porque en el front utilizamos params por eso req.query y no req.body

    //comprobar si la tarea existe o no (NOTA: se utiliza let para que sea cambiado valor con await en las siguientes lineas de codigo)
    let tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(404).json({ msg: "No existe esa tarea" });
    }

    //extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    //revisar ssi el proyecto actual pertenee al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //eliminar
    await Tarea.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea  Eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
