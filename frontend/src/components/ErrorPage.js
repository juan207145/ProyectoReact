import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1 style={{ color: "red" }}>Error</h1>
      <p>El correo o la contraseña no son correctos.</p>

      <Link to="/" className="btn btn-primary">
        Volver al Login
      </Link>
    </div>
  );
}

export default ErrorPage;
