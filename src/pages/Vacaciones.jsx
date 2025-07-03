import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const [modoEditar, setModoEditar] = useState(false);
  const [vacacionEditando, setVacacionEditando] = useState(null);

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

    let actualizadas;

    if (modoEditar && vacacionEditando !== null) {
      // ACTUALIZAR vacación existente
      actualizadas = vacaciones.map((v) =>
        v === vacacionEditando ? nuevaVacacion : v
      );
    } else {
      // AGREGAR nueva vacación
      actualizadas = [...vacaciones, nuevaVacacion];
    }

    setVacaciones(actualizadas);
    localStorage.setItem("vacaciones", JSON.stringify(actualizadas));

    // Reset
    setFormVacaciones({
      empleadoId: "",
      inicioVacaciones: "",
      finVacaciones: "",
    });
    setModoEditar(false);
    setVacacionEditando(null);
  };

  const handleEditarVacacion = (vacacion) => {
    setModoEditar(true);
    setVacacionEditando(vacacion);
    setFormVacaciones({
      empleadoId: vacacion.empleadoId.toString(),
      inicioVacaciones: vacacion.start.toISOString().slice(0, 10),
      finVacaciones: vacacion.end.toISOString().slice(0, 10),
    });
  };

  const handleEliminarVacacion = (vacacion) => {
    if (window.confirm("¿Eliminar estas vacaciones?")) {
      const actualizadas = vacaciones.filter((v) => v !== vacacion);
      setVacaciones(actualizadas);
      localStorage.setItem("vacaciones", JSON.stringify(actualizadas));
    }
  };

  return (
    <div>
      <h3>Lista de vacaciones</h3>
      <ul>
        {vacaciones.map((vac, idx) => (
          <li key={idx}>
            {vac.title} ({vac.start.toDateString()} - {vac.end.toDateString()})
            <button onClick={() => handleEditarVacacion(vac)}>Editar</button>
            <button onClick={() => handleEliminarVacacion(vac)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

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
