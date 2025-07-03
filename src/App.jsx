import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Bienvenido a la Gestión de Empleados</h1>
      <Link to="/empleados">Ir a empleados</Link>
    </div>
  );
}

export default App;
