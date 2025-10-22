require('dotenv').config();
const mongoose = require('mongoose');
const Producto = require('./models/Producto');

const productosEjemplo = [
  {
    nombre: "Laptop Profesional",
    descripcion: "Laptop de alto rendimiento con procesador Intel i7, 16GB RAM, 512GB SSD. Ideal para trabajo profesional y gaming.",
    precio: 1299.99,
    imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    categoria: "Electrónica",
    stock: 15
  },
  {
    nombre: "Smartphone Premium",
    descripcion: "Teléfono inteligente de última generación con cámara de 108MP, pantalla AMOLED y batería de larga duración.",
    precio: 899.99,
    imagen: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    categoria: "Electrónica",
    stock: 25
  },
  {
    nombre: "Auriculares Bluetooth",
    descripcion: "Auriculares inalámbricos con cancelación de ruido, 30 horas de batería y sonido premium.",
    precio: 199.99,
    imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    categoria: "Audio",
    stock: 40
  },
  {
    nombre: "Smartwatch Deportivo",
    descripcion: "Reloj inteligente con monitor de frecuencia cardíaca, GPS integrado y resistente al agua.",
    precio: 299.99,
    imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    categoria: "Accesorios",
    stock: 30
  },
  {
    nombre: "Cámara Digital Profesional",
    descripcion: "Cámara réflex digital de 24MP con lente 18-55mm, perfecta para fotografía profesional.",
    precio: 1499.99,
    imagen: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
    categoria: "Fotografía",
    stock: 10
  },
  {
    nombre: "Tablet 10 pulgadas",
    descripcion: "Tablet con pantalla de alta resolución, 128GB de almacenamiento y lápiz óptico incluido.",
    precio: 449.99,
    imagen: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    categoria: "Electrónica",
    stock: 20
  },
  {
    nombre: "Teclado Mecánico RGB",
    descripcion: "Teclado mecánico gaming con iluminación RGB personalizable y switches Cherry MX.",
    precio: 129.99,
    imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    categoria: "Accesorios",
    stock: 35
  },
  {
    nombre: "Mouse Gamer Inalámbrico",
    descripcion: "Mouse gaming de alta precisión con sensor de 16000 DPI y batería de 70 horas.",
    precio: 79.99,
    imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    categoria: "Accesorios",
    stock: 50
  }
];

async function poblarDB() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Conectado a MongoDB');

    // Limpiar la colección existente
    await Producto.deleteMany({});
    console.log('✓ Base de datos limpiada');

    // Insertar productos de ejemplo
    await Producto.insertMany(productosEjemplo);
    console.log(`✓ ${productosEjemplo.length} productos agregados exitosamente`);

    // Cerrar conexión
    await mongoose.connection.close();
    console.log('✓ Conexión cerrada');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error);
    process.exit(1);
  }
}

poblarDB();
