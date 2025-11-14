import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from './UserList';
import { useNavigate } from 'react-router-dom';

function UsuariosPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:5001/api/usuarios')
      .then(res => setUsers(res.data))
      .catch(() => navigate('/error'));
  }, [navigate]);

 
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/api/usuarios/${id}`)
      .then(() => setUsers(users.filter(u => u.id !== id)))
      .catch(() => navigate('/error'));
  };

    const handleEdit = (user) => {
      navigate(`/editar/${user.id}`, {
        state: {
          nombre: user.nombre,
          email: user.email,
          telefono: user.telefono
        }
      });
    };

  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Usuarios</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

     
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />

    </div>
  );
}

export default UsuariosPage;
