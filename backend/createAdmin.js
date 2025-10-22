require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('./models/Usuario');

async function crearAdmin() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Conectado a MongoDB');

    // Verificar si ya existe un admin
    const adminExistente = await Usuario.findOne({ username: 'admin' });
    if (adminExistente) {
      console.log('⚠ Ya existe un usuario admin');
      process.exit(0);
    }

    // Crear usuario admin
    const admin = new Usuario({
      username: 'admin',
      email: 'admin@tienda.com',
      password: 'admin123',  // Cambiar esta contraseña después
      role: 'admin'
    });

    await admin.save();
    console.log('✓ Usuario admin creado exitosamente');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    console.log('  ⚠ IMPORTANTE: Cambia la contraseña después del primer login');

    // Cerrar conexión
    await mongoose.connection.close();
    console.log('✓ Conexión cerrada');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error);
    process.exit(1);
  }
}

crearAdmin();
