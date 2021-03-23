const express = require("express");
//importamos la config a mongo
const conectarDB = require("./config/db");

//importamos cors para trabajar entre back y front en dominios apartes
const cors = require("cors");

//crear servidor
const app = express();

//conectamos a la base de datos
conectarDB();

//Habiliatar cors como funcion
app.use(cors())

//Habilitar express.json (remplaza al body.parse() para los header)
app.use(express.json({extended: true}))

//puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas (/api/name: esta ruta es para escalar a tener el back y front juntos)
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tarea"));


//arrancar la app
app.listen(PORT, () => {
  console.log("El servidor esta funcionando en el puerto: " + PORT);
});
