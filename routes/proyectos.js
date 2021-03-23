const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectosController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//Crea proyectos
//api/proyectos
router.post(
  "/",
  auth, //verifica el token
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.crearProyecto
);

router.get(
  "/",
  auth, //verifica el token
  proyectoController.obtenerProyectos
);

//actualiza proyecto via ID
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.actualizarProyecto
);

//eliminar un proyecto
router.delete("/:id", auth, proyectoController.eliminarProyecto);

module.exports = router;
