import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerProductoPorId } from '../services/api';
import './DetalleProducto.css';

function DetalleProducto({ agregarAlCarrito }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    cargarProducto();
  }, [id]);

  const cargarProducto = async () => {
    try {
      const data = await obtenerProductoPorId(id);
      setProducto(data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar el producto');
      setLoading(false);
    }
  };

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  if (loading) {
    return <div className="container"><p className="mensaje">Cargando producto...</p></div>;
  }

  if (error || !producto) {
    return <div className="container"><p className="mensaje error">{error || 'Producto no encontrado'}</p></div>;
  }

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="btn-volver">
        ← Volver al catálogo
      </button>
      <div className="detalle-producto">
        <div className="detalle-imagen-container">
          <img src={producto.imagen} alt={producto.nombre} className="detalle-imagen" />
        </div>
        <div className="detalle-info">
          <span className="detalle-categoria">{producto.categoria}</span>
          <h2 className="detalle-nombre">{producto.nombre}</h2>
          <p className="detalle-precio">${producto.precio.toFixed(2)}</p>
          <p className="detalle-descripcion">{producto.descripcion}</p>
          <div className="detalle-stock">
            <strong>Stock disponible:</strong> {producto.stock} unidades
          </div>
          <button
            onClick={handleAgregarAlCarrito}
            className="btn btn-agregar-grande"
            disabled={producto.stock === 0}
          >
            {producto.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
          </button>
          {agregado && (
            <p className="mensaje-agregado">¡Producto agregado al carrito!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
