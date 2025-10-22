import React, { useState, useEffect } from 'react';
import { obtenerProductos, crearProducto } from '../services/api';
import './Admin.css';

function Admin() {
  const [productos, setProductos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [imagenArchivo, setImagenArchivo] = useState(null);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
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

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenArchivo(file);
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imagen: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubirImagen = async () => {
    if (!imagenArchivo) {
      alert('Por favor selecciona una imagen primero');
      return;
    }

    setSubiendoImagen(true);
    const token = localStorage.getItem('token');
    const formDataImagen = new FormData();
    formDataImagen.append('image', imagenArchivo);

    try {
      const response = await fetch('https://tienda-online-backed.onrender.com/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataImagen
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({
          ...formData,
          imagen: data.url
        });
        setImagenArchivo(null);
        alert('Imagen subida exitosamente');
      } else {
        throw new Error(data.mensaje || 'Error al subir imagen');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al subir la imagen: ' + error.message);
    } finally {
      setSubiendoImagen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
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
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(productoData)
        });
        alert('Producto actualizado exitosamente');
      } else {
        const response = await fetch('https://tienda-online-backed.onrender.com/api/productos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(productoData)
        });

        if (!response.ok) throw new Error('Error al crear producto');
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
        const token = localStorage.getItem('token');
        await fetch(`https://tienda-online-backed.onrender.com/api/productos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
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
    setImagenArchivo(null);
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
              <label>Imagen del Producto:</label>

              <div className="imagen-upload-section">
                <div className="upload-options">
                  <div className="upload-option">
                    <label htmlFor="file-upload" className="file-upload-label">
                      📁 Seleccionar archivo
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImagenChange}
                      style={{ display: 'none' }}
                    />
                    {imagenArchivo && (
                      <button
                        type="button"
                        onClick={handleSubirImagen}
                        disabled={subiendoImagen}
                        className="btn-subir-imagen"
                      >
                        {subiendoImagen ? 'Subiendo...' : 'Subir Imagen'}
                      </button>
                    )}
                  </div>

                  <div className="separator">O</div>

                  <div className="upload-option">
                    <input
                      type="url"
                      name="imagen"
                      value={formData.imagen}
                      onChange={handleInputChange}
                      placeholder="Pegar URL de imagen..."
                      required
                    />
                  </div>
                </div>

                {formData.imagen && (
                  <div className="imagen-preview">
                    <p>Vista previa:</p>
                    <img src={formData.imagen} alt="Preview" />
                  </div>
                )}
              </div>
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
