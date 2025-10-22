const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { auth, isAdmin } = require('../middleware/auth');

// Configurar multer para manejar la carga de archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB máximo
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'));
    }
  }
});

// Ruta para subir imagen (requiere autenticación de admin)
router.post('/', auth, isAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ mensaje: 'No se proporcionó ninguna imagen' });
    }

    // Convertir buffer a base64
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'tienda-online',
      resource_type: 'auto'
    });

    res.json({
      mensaje: 'Imagen subida exitosamente',
      url: result.secure_url
    });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ mensaje: 'Error al subir la imagen', error: error.message });
  }
});

module.exports = router;
