const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarios'); // CRUD de usuarios
const authRoutes = require('./routes/auth'); // Login

const app = express();
const PORT = 5001;

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Rutas
app.use('/api/usuarios', usuariosRoutes); // CRUD
app.use('/api/auth', authRoutes); // Login

// ✅ Ruta base (opcional, para probar)
app.get('/', (req, res) => {
  res.json({ message: 'API de Usuarios funcionando correctamente' });
});

// ✅ Servidor corriendo
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
