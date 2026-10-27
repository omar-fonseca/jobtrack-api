
const express = require("express");

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Datos temporales en memoria
const postulaciones = [
  {
    id: 1,
    empresa: "Empresa Demo A",
    cargo: "Backend Developer",
    estado: "Pendiente"
  },
  {
    id: 2,
    empresa: "Empresa Demo B",
    cargo: "Full Stack Developer",
    estado: "Entrevista"
  }
];

// Identificador para nuevas postulaciones
let siguienteId = 3;

// GET: verificar estado del servidor HTTP
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "jobtrack-api"
  });
});

// GET: consultar todas las postulaciones
app.get("/api/v1/postulaciones", (req, res) => {
  res.status(200).json({
    total: postulaciones.length,
    data: postulaciones
  });
});

// POST: crear una nueva postulación
app.post("/api/v1/postulaciones", (req, res) => {
  const { empresa, cargo } = req.body || {};

  // Validación de datos
  if (
    typeof empresa !== "string" ||
    empresa.trim() === "" ||
    typeof cargo !== "string" ||
    cargo.trim() === ""
  ) {
    return res.status(400).json({
      error: "Empresa y cargo son obligatorios"
    });
  }

  // Construcción del nuevo registro
  const nuevaPostulacion = {
    id: siguienteId,
    empresa: empresa.trim(),
    cargo: cargo.trim(),
    estado: "Pendiente"
  };

  siguienteId++;

  // Almacenamiento temporal
  postulaciones.push(nuevaPostulacion);

  return res.status(201).json(nuevaPostulacion);
});

// Exportar la aplicación
module.exports = app;
