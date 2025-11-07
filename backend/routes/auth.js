const express = require('express');
const router = express.Router();
const db = require('../config/database'); // tu conexión a MySQL

// Ruta para login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Para depuración
  console.log('Email recibido:', email);
  console.log('Password recibido:', password);

  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Error al validar login:', err);
      return res.status(500).json({ message: 'Error al validar login' });
    }

    console.log('Resultados de DB:', results);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    res.json({ message: 'Login exitoso', user: results[0] });
  });
});

module.exports = router;
