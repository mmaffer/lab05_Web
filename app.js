const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const ticketRoutes = require("./routes/ticket.routes");
const notificationRoutes = require("./routes/notification.routes");

// Middleware
app.use(express.json()); // Para leer JSON en las solicitudes
app.use(cors()); // Permitir solicitudes de otros dominios
app.use(morgan("dev")); // detalles de cada petición

// Rutas
app.use("/tickets", ticketRoutes);
app.use("/notifications", notificationRoutes);

// Mensaje de prueba en la raíz
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API RESTful!");
});

// --- Middleware de errores ---
const errorHandler = (err, req, res, next) => {
  console.error("Error global capturado:", err.message);
  res.status(500).json({
    error: "Ocurrió un error interno en el servidor",
    message: err.message
  });
};

app.use(errorHandler);
// ----------------------------

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});