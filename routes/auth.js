//rutas para autenticar ususarios
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

//crea un usuario
//api/auth (endpoint)
router.post("/", authController.autenticarUsuario);

//obtiene el user autenticado
router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
