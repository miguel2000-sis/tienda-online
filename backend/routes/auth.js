const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Registro de nuevo usuario (solo para crear el primer admin)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ $or: [{ username }, { email }] });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'Usuario o email ya existe' });
    }

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      username,
      email,
      password,
      role: role || 'user'
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const esValida = await usuario.comparePassword(password);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, username: usuario.username, role: usuario.role },
      process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambialo_en_produccion',
      { expiresIn: '24h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        username: usuario.username,
        email: usuario.email,
        role: usuario.role
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
});

// Verificar token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ mensaje: 'No autorizado' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambialo_en_produccion'
    );

    const usuario = await Usuario.findById(decoded.id).select('-password');
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ usuario });
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
});

module.exports = router;
