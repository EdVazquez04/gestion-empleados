const EmpleadoForm = ({
  formEmpleado,
  modoEditar,
  handleChange,
  handleAgregar,
  handleCancelar,
}) => {
  return (
    <form onSubmit={handleAgregar} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formEmpleado.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="puesto"
        placeholder="Puesto"
        value={formEmpleado.puesto}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={formEmpleado.correo}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="fechaNacimiento"
        value={formEmpleado.fechaNacimiento}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {modoEditar ? "Actualizar" : "Agregar"}
      </button>
      {modoEditar && (
        <button type="button" onClick={handleCancelar}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default EmpleadoForm;
