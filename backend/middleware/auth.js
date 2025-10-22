const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ mensaje: 'No autorizado - Token no proporcionado' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambialo_en_produccion'
    );

    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'No autorizado - Token inválido' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.role === 'admin') {
    next();
  } else {
    res.status(403).json({ mensaje: 'Acceso denegado - Se requiere rol de administrador' });
  }
};

module.exports = { auth, isAdmin };
