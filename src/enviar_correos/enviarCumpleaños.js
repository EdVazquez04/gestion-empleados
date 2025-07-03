const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const empleadosPath = path.join(__dirname, "empleados.json");

// Leer empleados
const empleados = JSON.parse(fs.readFileSync(empleadosPath, "utf8"));

// Fecha actual
const hoy = new Date();
const dia = hoy.getDate();
const mes = hoy.getMonth() + 1;
const fechaLog = hoy.toISOString().slice(0, 10);

// Configura Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lvazquez@dumaxst.com",
    pass: "ygpx ctsf pofo fgsg" 
  }
});

// Log de envíos
const logPath = path.join(__dirname, `logs/envios-${fechaLog}.log`);
fs.mkdirSync(path.dirname(logPath), { recursive: true });

const log = (mensaje) => {
  console.log(mensaje);
  fs.appendFileSync(logPath, mensaje + "\n");
};

// Verifica y envía correos
empleados.forEach(emp => {
  const [año, mesStr, diaStr] = emp.fechaNacimiento.split("-");
  if (parseInt(mesStr) === mes && parseInt(diaStr) === dia) {
    const mailOptions = {
      from: "lvazquez@dumaxst.com",
      to: emp.correo,
      subject: "🎉 ¡Feliz cumpleaños!",
      text: `Hola ${emp.nombre}, ¡te deseamos un muy feliz cumpleaños! 🎂🎈`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        log(`❌ Error al enviar a ${emp.nombre}: ${error.message}`);
      } else {
        log(`✅ Correo enviado a ${emp.nombre}: ${info.response}`);
      }
    });
  }
});
