//rutas para crear usuarios
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const {check} = require('express-validator');

//crea un usuario
//api/usuarios (endpoint)
router.post(
  "/",
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email vàlido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
  ],
  usuarioController.crearUsuario //utilizamos esta funcion(middleware)
);
module.exports = router;
