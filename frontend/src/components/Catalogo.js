import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../services/api';
import './Catalogo.css';

function Catalogo({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los productos');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container"><p className="mensaje">Cargando productos...</p></div>;
  }

  if (error) {
    return <div className="container"><p className="mensaje error">{error}</p></div>;
  }

  if (productos.length === 0) {
    return (
      <div className="container">
        <p className="mensaje">No hay productos disponibles. Agrega algunos desde la API.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="catalogo-titulo">Nuestros Productos</h2>
      <div className="productos-grid">
        {productos.map(producto => (
          <div key={producto._id} className="producto-card">
            <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
            <div className="producto-info">
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <p className="producto-categoria">{producto.categoria}</p>
              <p className="producto-precio">${producto.precio.toFixed(2)}</p>
              <div className="producto-acciones">
                <Link to={`/producto/${producto._id}`} className="btn btn-detalles">
                  Ver Detalles
                </Link>
                <button
                  onClick={() => agregarAlCarrito(producto)}
                  className="btn btn-agregar"
                  disabled={producto.stock === 0}
                >
                  {producto.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;
