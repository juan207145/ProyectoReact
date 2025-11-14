import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/usuarios");
      } else {
        setError("Correo o contraseña incorrectos");
        setEmail("");     
        setPassword("");  
      }

    } catch (err) {
      setError("Correo o contraseña incorrectos");
      setEmail("");     
      setPassword("");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <form 
        onSubmit={handleSubmit}
        className="mx-auto p-4 border rounded"
        style={{ maxWidth: "320px" }}
      >
        <h3 className="mb-3">Login</h3>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-danger mb-2">{error}</p>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
