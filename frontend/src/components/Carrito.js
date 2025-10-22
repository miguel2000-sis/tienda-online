import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Carrito.css';

function Carrito({ carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito }) {
  const navigate = useNavigate();

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  if (carrito.length === 0) {
    return (
      <div className="container">
        <div className="carrito-vacio">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega algunos productos para comenzar</p>
          <button onClick={() => navigate('/')} className="btn btn-continuar">
            Ir a Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="carrito-container">
        <div className="carrito-header">
          <h2>Carrito de Compras</h2>
          <button onClick={vaciarCarrito} className="btn btn-vaciar">
            Vaciar Carrito
          </button>
        </div>

        <div className="carrito-items">
          {carrito.map(item => (
            <div key={item._id} className="carrito-item">
              <img src={item.imagen} alt={item.nombre} className="carrito-item-imagen" />
              <div className="carrito-item-info">
                <h3>{item.nombre}</h3>
                <p className="carrito-item-categoria">{item.categoria}</p>
                <p className="carrito-item-precio">${item.precio.toFixed(2)}</p>
              </div>
              <div className="carrito-item-cantidad">
                <button
                  onClick={() => actualizarCantidad(item._id, item.cantidad - 1)}
                  className="btn-cantidad"
                >
                  -
                </button>
                <span className="cantidad-valor">{item.cantidad}</span>
                <button
                  onClick={() => actualizarCantidad(item._id, item.cantidad + 1)}
                  className="btn-cantidad"
                  disabled={item.cantidad >= item.stock}
                >
                  +
                </button>
              </div>
              <div className="carrito-item-subtotal">
                <p>Subtotal:</p>
                <p className="subtotal-valor">${(item.precio * item.cantidad).toFixed(2)}</p>
              </div>
              <button
                onClick={() => eliminarDelCarrito(item._id)}
                className="btn-eliminar"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="carrito-resumen">
          <div className="resumen-contenido">
            <h3>Resumen del Pedido</h3>
            <div className="resumen-linea">
              <span>Subtotal ({carrito.length} productos):</span>
              <span>${calcularTotal().toFixed(2)}</span>
            </div>
            <div className="resumen-linea">
              <span>Envío:</span>
              <span>Gratis</span>
            </div>
            <div className="resumen-total">
              <span>Total:</span>
              <span className="total-valor">${calcularTotal().toFixed(2)}</span>
            </div>
            <button className="btn btn-checkout">
              Proceder al Pago
            </button>
            <button onClick={() => navigate('/')} className="btn btn-continuar-comprando">
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
