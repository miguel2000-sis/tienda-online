import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ cantidadCarrito }) {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <h1>Tienda Online</h1>
        </Link>
        <nav>
          <Link to="/" className="nav-link">Productos</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
          <Link to="/carrito" className="nav-link carrito-link">
            Carrito
            {cantidadCarrito > 0 && (
              <span className="carrito-badge">{cantidadCarrito}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
