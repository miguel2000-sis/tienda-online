import React, { useState, useEffect } from 'react';
import { obtenerProductos, crearProducto } from '../services/api';
import './Admin.css';

function Admin() {
  const [productos, setProductos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    categoria: '',
    stock: ''
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productoData = {
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock)
      };

      if (productoEditando) {
        await fetch(`https://tienda-online-backed.onrender.com/api/productos/${productoEditando._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productoData)
        });
        alert('Producto actualizado exitosamente');
      } else {
        await crearProducto(productoData);
        alert('Producto agregado exitosamente');
      }

      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        imagen: '',
        categoria: '',
        stock: ''
      });
      setMostrarFormulario(false);
      setProductoEditando(null);
      cargarProductos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
      alert('Error al guardar el producto');
    }
  };

  const handleEditar = (producto) => {
    setProductoEditando(producto);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagen,
      categoria: producto.categoria,
      stock: producto.stock
    });
    setMostrarFormulario(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await fetch(`https://tienda-online-backed.onrender.com/api/productos/${id}`, {
          method: 'DELETE'
        });
        alert('Producto eliminado exitosamente');
        cargarProductos();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  const cancelarEdicion = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      imagen: '',
      categoria: '',
      stock: ''
    });
    setMostrarFormulario(false);
    setProductoEditando(null);
  };

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>

      <div className="admin-header">
        <button
          className="btn-nuevo-producto"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? 'Cancelar' : 'Agregar Nuevo Producto'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="formulario-producto">
          <h2>{productoEditando ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Descripción:</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                required
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Precio:</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>URL de Imagen:</label>
              <input
                type="url"
                name="imagen"
                value={formData.imagen}
                onChange={handleInputChange}
                placeholder="https://..."
                required
              />
            </div>

            <div className="form-group">
              <label>Categoría:</label>
              <input
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Stock:</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-guardar">
                {productoEditando ? 'Actualizar' : 'Guardar'}
              </button>
              <button type="button" className="btn-cancelar" onClick={cancelarEdicion}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="lista-productos-admin">
        <h2>Productos ({productos.length})</h2>
        <div className="tabla-productos">
          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto._id}>
                  <td>
                    <img src={producto.imagen} alt={producto.nombre} className="img-tabla" />
                  </td>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.stock}</td>
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => handleEditar(producto)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminar(producto._id)}
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
    </div>
  );
}

export default Admin;
