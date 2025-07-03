import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import App from "./App.jsx";
import Empleados from "./pages/Empleados.jsx";
import Vacaciones from "./pages/Vacaciones";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/vacaciones" element={<Vacaciones />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);