import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import './App.css'; // Aquí defines tus colores corporativos

function App() {
  // Usuario logueado
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // CRUD usuarios
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', rol: 'usuario', password: '' });

  // Obtener usuarios
  const fetchUsers = () => {
    axios.get('http://localhost:5001/api/usuarios')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Credenciales incorrectas");
    }
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Crear/Actualizar usuario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      axios.put(`http://localhost:5001/api/usuarios/${editingUser.id}`, formData)
        .then(() => {
          setEditingUser(null);
          setFormData({ nombre: '', email: '', telefono: '', rol: 'usuario', password: '' });
          fetchUsers();
        })
        .catch(err => console.error(err));
    } else {
      axios.post('http://localhost:5001/api/usuarios', formData)
        .then(() => {
          setFormData({ nombre: '', email: '', telefono: '', rol: 'usuario', password: '' });
          fetchUsers();
        })
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ ...user });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      axios.delete(`http://localhost:5001/api/usuarios/${id}`)
        .then(() => fetchUsers())
        .catch(err => console.error(err));
    }
  };

  // Si no hay usuario → Login
  if (!user) {
    return (
      <div className="container mt-5">
        <div className="card mx-auto" style={{ maxWidth: "400px" }}>
          <div className="card-body text-center">
            <img src="/assets/logo.png" alt="Solcuione.SA Logo" className="mb-3" style={{ width: "120px" }} />
            <h3 className="card-title mb-2">Solcuione.SA</h3>
            <h4 className="card-title mb-4">Iniciar Sesión</h4>
            <form onSubmit={handleLogin}>
              <div className="mb-3 text-start">
                <label className="form-label">Correo</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3 text-start">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-primary w-100">Entrar</button>
            </form>
            <div className="mt-3">
              <small>Admin: admin@correo.com / 1234</small><br/>
              <small>Usuario: usuario@correo.com / 1234</small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Usuario logueado → CRUD
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <img src="/assets/logo.png" alt="Solcuione.SA Logo" style={{ width: "50px", marginRight: "10px" }} />
          <h1 className="text-primary">Solcuione.SA - Gestión de Usuarios</h1>
        </div>
        <button className="btn btn-secondary" onClick={handleLogout}>Cerrar sesión</button>
      </div>

      {/* Formulario */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{editingUser ? "Editar Usuario" : "Agregar Usuario"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input className="form-control" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input className="form-control" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input className="form-control" value={formData.telefono} onChange={e => setFormData({ ...formData, telefono: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Rol</label>
              <select className="form-select" value={formData.rol} onChange={e => setFormData({ ...formData, rol: e.target.value })}>
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-success">{editingUser ? 'Actualizar' : 'Guardar'}</button>
          </form>
        </div>
      </div>

      {/* Lista de usuarios */}
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
