# Proyecto React - Gestión de Usuarios

## Descripción
Aplicación web desarrollada en React y Node.js con MySQL que permite gestionar usuarios mediante un CRUD completo (Crear, Leer, Actualizar, Eliminar) y autenticación con roles (`admin` y `usuario`).

---

## Tecnologías utilizadas
- **Frontend:** React, Axios
- **Backend:** Node.js, Express
- **Base de datos:** MySQL
- **Control de versiones:** Git / GitHub

---

## Funcionalidades
1. **Login y Logout**
   - Autenticación de usuarios mediante correo y contraseña.
   - Manejo de roles: `admin` y `usuario`.
   - Persistencia de sesión en `localStorage`.

2. **CRUD de Usuarios**
   - Crear nuevos usuarios con nombre, correo, teléfono, rol y contraseña.
   - Listar todos los usuarios registrados.
   - Editar usuarios existentes.
   - Eliminar usuarios.

3. **Validaciones**
   - Login valida credenciales contra la base de datos.
   - Formulario de usuarios requiere campos obligatorios.

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/juan207145/ProyectoReact.git
cd ProyectoReact
