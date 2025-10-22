import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ cantidadCarrito }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <h1>Tienda Online</h1>
        </Link>
        <nav>
          <Link to="/" className="nav-link">Productos</Link>
          {token && usuario?.role === 'admin' && (
            <Link to="/admin" className="nav-link">Admin</Link>
          )}
          <Link to="/carrito" className="nav-link carrito-link">
            Carrito
            {cantidadCarrito > 0 && (
              <span className="carrito-badge">{cantidadCarrito}</span>
            )}
          </Link>
          {token ? (
            <button onClick={handleLogout} className="nav-link btn-logout">
              Cerrar Sesión
            </button>
          ) : (
            <Link to="/login" className="nav-link">Iniciar Sesión</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
