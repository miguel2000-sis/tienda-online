require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('./models/Usuario');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function cambiarPassword() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Conectado a MongoDB\n');

    // Solicitar username
    rl.question('Ingresa el nombre de usuario (default: admin): ', async (username) => {
      const user = username.trim() || 'admin';

      // Solicitar nueva contraseña
      rl.question('Ingresa la nueva contraseña: ', async (newPassword) => {
        if (!newPassword || newPassword.length < 6) {
          console.log('✗ La contraseña debe tener al menos 6 caracteres');
          rl.close();
          await mongoose.connection.close();
          process.exit(1);
        }

        try {
          // Buscar usuario
          const usuario = await Usuario.findOne({ username: user });
          if (!usuario) {
            console.log(`✗ Usuario "${user}" no encontrado`);
            rl.close();
            await mongoose.connection.close();
            process.exit(1);
          }

          // Actualizar contraseña
          usuario.password = newPassword;
          await usuario.save();

          console.log(`\n✓ Contraseña actualizada exitosamente para "${user}"`);
          console.log('⚠ Guarda esta contraseña en un lugar seguro\n');

          rl.close();
          await mongoose.connection.close();
          process.exit(0);
        } catch (error) {
          console.error('✗ Error:', error.message);
          rl.close();
          await mongoose.connection.close();
          process.exit(1);
        }
      });
    });
  } catch (error) {
    console.error('✗ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
}

cambiarPassword();
