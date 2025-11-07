import React from 'react';

function UserList({ users, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Lista de usuarios</h5>
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.telefono}</td>
                <td>{u.rol}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => onEdit(u)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(u.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
