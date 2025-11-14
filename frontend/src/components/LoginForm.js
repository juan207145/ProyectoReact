import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password
      });

      if (res.data && res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate('/usuarios');
      } else {
        navigate('/error');
      }

    } catch (error) {
    
      navigate('/error');
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '300px' }}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Correo"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
