const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Conexión a MySQL usando variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "clientes"
});

// Verificar conexión
db.connect((error) => {
  if (error) {
    console.error("Error al conectar con MySQL:", error);
    return;
  }

  console.log("Conectado correctamente a MySQL");
});

// Ruta principal de prueba
app.get("/", (req, res) => {
  res.send("Backend de clientes funcionando correctamente");
});

// Endpoint solicitado en el PDF
app.get("/clientes", (req, res) => {
  const sql = "SELECT id, nombre, apellidos, ciudad FROM clientes";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al consultar clientes:", error);
      return res.status(500).json({
        mensaje: "Error al obtener los clientes"
      });
    }

    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});