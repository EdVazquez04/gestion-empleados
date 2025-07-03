// enviarCumpleaños.js
const fs = require("fs");
const nodemailer = require("nodemailer");

// Leer empleados desde archivo JSON exportado
const empleados = JSON.parse(fs.readFileSync("empleados.json", "utf8"));

// Fecha actual
const hoy = new Date();
const dia = hoy.getDate();
const mes = hoy.getMonth() + 1;

// Configura tu correo (usa contraseña de aplicación en Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lvazquez@dumaxst.com",
    pass: "ygpx ctsf pofo fgsg"
  }
});

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
        console.error("❌ Error al enviar a", emp.nombre, ":", error.message);
      } else {
        console.log(`✅ Correo enviado a ${emp.nombre}: ${info.response}`);
      }
    });
  }
});
