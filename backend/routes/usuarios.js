const express = require('express');
const router = express.Router();
const db = require('../config/database');



router.get('/', (req, res) => {
  const query = 'SELECT * FROM usuarios ORDER BY id DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({
        error: 'Error al obtener usuarios',
        details: err.message
      });
    }
    res.json(results);
  });
});



router.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM usuarios WHERE id = ? LIMIT 1';

  db.query(sql, [id], (error, results) => {
    if (error) {
      console.error('❌ Error al obtener usuario:', error);
      return res.status(500).json({
        message: 'Error al obtener usuario',
        error: error.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(results[0]);
  });
});



router.post('/', (req, res) => {
  const { nombre, email, telefono } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ message: 'Nombre y email son obligatorios' });
  }

  const sql = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
  
  db.query(sql, [nombre, email, telefono || null], (error, result) => {
    if (error) {
      console.error('❌ Error al insertar usuario:', error);
      return res.status(500).json({ message: 'No se pudo crear el usuario', error: error.message });
    }

    res.status(201).json({
      id: result.insertId,
      nombre,
      email,
      telefono
    });
  });
});



router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;

  const sql = 'UPDATE usuarios SET nombre=?, email=?, telefono=? WHERE id=?';

  db.query(sql, [nombre, email, telefono, id], (error) => {
    if (error) {
      console.error('❌ Error al actualizar usuario:', error);
      return res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
    }

    res.json({ message: '✅ Usuario actualizado correctamente' });
  });
});



router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM usuarios WHERE id = ?';

  db.query(sql, [id], (error, result) => {
    if (error) {
      console.error('❌ Error al eliminar usuario:', error);
      return res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: '🗑️ Usuario eliminado correctamente' });
  });
});

module.exports = router;

