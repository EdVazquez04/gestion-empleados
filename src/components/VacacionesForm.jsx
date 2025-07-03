const VacacionesForm = ({
  formVacaciones,
  empleados,
  handleChange,
  handleAgregar,
}) => {
  return (
    <form onSubmit={handleAgregar} style={{ marginBottom: "20px" }}>
      <select
        name="empleadoId"
        value={formVacaciones.empleadoId}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona un empleado</option>
        {empleados.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.nombre}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="inicioVacaciones"
        value={formVacaciones.inicioVacaciones}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="finVacaciones"
        value={formVacaciones.finVacaciones}
        onChange={handleChange}
        required
      />

      <button type="submit">Agregar vacaciones</button>
    </form>
  );
};

export default VacacionesForm;