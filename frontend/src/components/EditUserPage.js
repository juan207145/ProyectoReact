import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();


  const { nombre, email, telefono } = location.state || {};


  if (!location.state) {
    navigate("/usuarios");
  }

  const [formData, setFormData] = useState({
    nombre: nombre || "",
    email: email || "",
    telefono: telefono || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5001/api/usuarios/${id}`, formData)
      .then(() => navigate('/usuarios'))
      .catch(() => alert("Error al actualizar usuario"));
  };

  return (
    <div className="container mt-4">
      <h2>Editar Usuario</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        
        <div className="mb-3">
          <label>Nombre</label>
          <input
            className="form-control"
            value={formData.nombre}
            onChange={e => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Teléfono</label>
          <input
            className="form-control"
            value={formData.telefono}
            onChange={e => setFormData({ ...formData, telefono: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Guardar cambios
        </button>

      </form>
    </div>
  );
}

export default EditUserPage;
