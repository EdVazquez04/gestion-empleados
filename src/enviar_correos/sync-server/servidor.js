const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 4000;

const rutaEmpleados = path.join(__dirname, "../empleados.json");

app.use(cors());
app.use(bodyParser.json());

app.post("/sync-empleados", (req, res) => {
  const empleados = req.body;

  fs.writeFileSync(rutaEmpleados, JSON.stringify(empleados, null, 2));

  console.log(`✅ empleados.json actualizado en: ${rutaEmpleados}`);
  res.status(200).json({ mensaje: "Datos sincronizados correctamente" });
});

app.listen(PORT, () => {
  console.log(`Servidor de sincronización activo en http://localhost:${PORT}`);
});
