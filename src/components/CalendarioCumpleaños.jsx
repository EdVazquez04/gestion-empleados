import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configuración para fechas en español
const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

function CalendarioCumpleaños({ empleados }) {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const añoActual = new Date().getFullYear();

    const eventosCumple = empleados.map((emp) => {
      const [año, mes, dia] = emp.fechaNacimiento.split("-");
      const fecha = new Date(añoActual, mes - 1, dia);

      return {
        title: `🎂 Cumpleaños de ${emp.nombre}`,
        start: fecha,
        end: fecha,
        allDay: true,
      };
    });

    setEventos(eventosCumple);
  }, [empleados]);

  return (
    <div style={{ height: "400px",width: "800px", marginTop: "20px" }}>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400 }}
      />
    </div>
  );
}

export default CalendarioCumpleaños;
