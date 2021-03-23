const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const conectarDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Conectado...");
  } catch (error) {
    console.log(error);
    process.exit(); //detenemos la ejecucion
  }
};

module.exports = conectarDB;
