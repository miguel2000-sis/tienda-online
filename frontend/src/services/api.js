import axios from 'axios';

const API_URL = 'https://tienda-online-backed.onrender.com/api';

export const obtenerProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const obtenerProductoPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
};

export const crearProducto = async (producto) => {
  try {
    const response = await axios.post(`${API_URL}/productos`, producto);
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};
