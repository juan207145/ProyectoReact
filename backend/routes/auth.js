const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Ruta para login (validar correo y contraseña)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  // Consulta SQL para validar usuario
  const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Error al validar login:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    // Si el usuario no existe
    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Login correcto
    res.json({ message: 'Login exitoso', user: results[0] });
  });
});

module.exports = router;
