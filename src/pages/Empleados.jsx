import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import EmpleadoForm from "../components/EmpleadoForm";
import EmpleadoTabla from "../components/EmpleadoTabla";
import CalendarioCumpleaños from "../components/CalendarioCumpleaños";

const Empleados = () => {
  const [empleados, setEmpleados] = useState(() => {
    const data = localStorage.getItem("empleados");
    return data ? JSON.parse(data) : [];
  });

  const [formEmpleado, setFormEmpleado] = useState({
    nombre: "",
    puesto: "",
    correo: "",
    fechaNacimiento: "",
  });

  const [modoEditar, setModoEditar] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [vacaciones, setVacaciones] = useState(() => {
    const data = localStorage.getItem("vacaciones");
    return data ? JSON.parse(data) : [];
  });

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("empleados", JSON.stringify(empleados));
  }, [empleados]);

  useEffect(() => {
    localStorage.setItem("vacaciones", JSON.stringify(vacaciones));
  }, [vacaciones]);

  const handleChange = (e) => {
    setFormEmpleado({
      ...formEmpleado,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgregar = (e) => {
    e.preventDefault();

    if (modoEditar) {
      setEmpleados(
        empleados.map((emp) =>
          emp.id === idEditando ? { ...formEmpleado, id: idEditando } : emp
        )
      );
      setModoEditar(false);
      setIdEditando(null);
    } else {
      const nuevo = {
        ...formEmpleado,
        id: Date.now(),
      };
      setEmpleados([...empleados, nuevo]);
    }

    setFormEmpleado({
      nombre: "",
      puesto: "",
      correo: "",
      fechaNacimiento: "",
    });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Deseas eliminar este empleado?")) {
      setEmpleados(empleados.filter((emp) => emp.id !== id));

      if (modoEditar && idEditando === id) {
        handleCancelar();
      }

      setVacaciones(vacaciones.filter((v) => v.empleadoId !== id));
    }
  };

  const handleEditar = (empleado) => {
    setFormEmpleado({
      nombre: empleado.nombre,
      puesto: empleado.puesto,
      correo: empleado.correo,
      fechaNacimiento: empleado.fechaNacimiento,
    });
    setModoEditar(true);
    setIdEditando(empleado.id);
  };

  const handleCancelar = () => {
    setModoEditar(false);
    setIdEditando(null);
    setFormEmpleado({
      nombre: "",
      puesto: "",
      correo: "",
      fechaNacimiento: "",
    });
  };

  const handleVacaciones = (empleadoId) => {
    const empleado = empleados.find((e) => e.id === empleadoId);
    setEmpleadoSeleccionado(empleado);
  };

  const handleGuardarVacacion = (evento) => {
    setVacaciones([...vacaciones, evento]);
    setEmpleadoSeleccionado(null);
  };

  return (
    <div>
      <h1>Gestión de Empleados</h1>

      <h2>{modoEditar ? "Editar empleado" : "Agregar nuevo empleado"}</h2>

      <EmpleadoForm
        formEmpleado={formEmpleado}
        modoEditar={modoEditar}
        handleChange={handleChange}
        handleAgregar={handleAgregar}
        handleCancelar={handleCancelar}
      />

      <h2>Lista de empleados</h2>

      <EmpleadoTabla
        empleados={empleados}
        handleEditar={handleEditar}
        handleEliminar={handleEliminar}
        handleVacaciones={handleVacaciones}
      />

      <Link to="/vacaciones" style={{ marginBottom: "20px" }}>
        <button>Ir a gestión de vacaciones</button>
      </Link>

      <h3>Calendario de Cumpleaños</h3>

      <CalendarioCumpleaños empleados={empleados} />

    </div>
  );
};

export default Empleados;
