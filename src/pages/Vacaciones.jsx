import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import VacacionesForm from "../components/VacacionesForm";

const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const Vacaciones = () => {
  const [vacaciones, setVacaciones] = useState(() => {
    const data = localStorage.getItem("vacaciones");
    return data
      ? JSON.parse(data).map((v) => ({
          ...v,
          start: new Date(v.start),
          end: new Date(v.end),
        }))
      : [];
  });

  const [empleados, setEmpleados] = useState(() => {
    const data = localStorage.getItem("empleados");
    return data ? JSON.parse(data) : [];
  });

  const [formVacaciones, setFormVacaciones] = useState({
    empleadoId: "",
    inicioVacaciones: "",
    finVacaciones: "",
  });

  const handleChange = (e) => {
    setFormVacaciones({
      ...formVacaciones,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgregar = (e) => {
    e.preventDefault();

    const empleado = empleados.find(
      (emp) => emp.id.toString() === formVacaciones.empleadoId
    );

    const nuevaVacacion = {
      title: `Vacaciones - ${empleado.nombre}`,
      start: new Date(formVacaciones.inicioVacaciones + "T12:00:00"),
      end: new Date(formVacaciones.finVacaciones + "T12:00:00"),
      empleadoId: empleado.id,
    };

    const actualizadas = [...vacaciones, nuevaVacacion];
    setVacaciones(actualizadas);
    localStorage.setItem("vacaciones", JSON.stringify(actualizadas));

    setFormVacaciones({
      empleadoId: "",
      inicioVacaciones: "",
      finVacaciones: "",
    });
  };

  return (
    <div>
      <h1>Calendario de Vacaciones</h1>

      <VacacionesForm
        formVacaciones={formVacaciones}
        empleados={empleados}
        handleChange={handleChange}
        handleAgregar={handleAgregar}
      />

      <div style={{ height: "400px", width: "600px" }}>
        <Calendar
          localizer={localizer}
          events={vacaciones}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          messages={{
            today: "Hoy",
            next: "Sig.",
            previous: "Ant.",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}
        />
      </div>

      <Link to="/empleados" style={{ marginBottom: "20px" }}>
        <button>Volver</button>
      </Link>

    </div>
  );
};

export default Vacaciones;
