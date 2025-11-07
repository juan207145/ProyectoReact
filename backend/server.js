const express = require('express');
const cors = require('cors');

// Importar rutas
const usuariosRoutes = require('./routes/usuarios');
const authRoutes = require('./routes/auth'); // <-- aquí estaba el problema

const app = express();
const PORT = 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Usuarios funcionando correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
