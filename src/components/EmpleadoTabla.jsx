const EmpleadoTabla = ({ empleados, handleEditar, handleEliminar,handleVacaciones }) => {
  if (empleados.length === 0) {
    return <p>No hay empleados registrados.</p>;
  }

  return (
    <table border="1" cellPadding="8" cellSpacing="0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Puesto</th>
          <th>Correo</th>
          <th>Fecha de nacimiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.nombre}</td>
            <td>{emp.puesto}</td>
            <td>{emp.correo}</td>
            <td>{emp.fechaNacimiento}</td>
            <td>
              <button onClick={() => handleEditar(emp)}>Editar</button>
              <button onClick={() => handleEliminar(emp.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmpleadoTabla;
