import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Catalogo from './components/Catalogo';
import DetalleProducto from './components/DetalleProducto';
import Carrito from './components/Carrito';
import Admin from './components/Admin';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(item => item._id === producto._id);

    if (productoExistente) {
      setCarrito(carrito.map(item =>
        item._id === producto._id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item._id !== productoId));
  };

  const actualizarCantidad = (productoId, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(productoId);
    } else {
      setCarrito(carrito.map(item =>
        item._id === productoId
          ? { ...item, cantidad }
          : item
      ));
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <Router>
      <div className="App">
        <Header cantidadCarrito={carrito.reduce((acc, item) => acc + item.cantidad, 0)} />
        <Routes>
          <Route
            path="/"
            element={<Catalogo agregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/producto/:id"
            element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                eliminarDelCarrito={eliminarDelCarrito}
                actualizarCantidad={actualizarCantidad}
                vaciarCarrito={vaciarCarrito}
              />
            }
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
