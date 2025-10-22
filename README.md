# Tienda Online

Una aplicación de tienda online completa con React, Node.js, Express y MongoDB.

## Características

- Catálogo de productos con imágenes
- Búsqueda y filtrado de productos
- Página de detalles de producto
- Carrito de compras funcional
- API REST completa con MongoDB
- Diseño responsive

## Tecnologías Utilizadas

### Frontend
- React 18
- React Router DOM
- Axios
- CSS3

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- CORS

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB instalado y ejecutándose
- npm o yarn

## Instalación

### 1. Clonar el repositorio o navegar al directorio

```bash
cd tienda-online
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del frontend

```bash
cd ../frontend
npm install
```

### 4. Configurar variables de entorno

El archivo `.env` en la carpeta `backend` ya está configurado con:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tienda-online
```

Asegúrate de que MongoDB esté ejecutándose en tu máquina local.

## Uso

### 1. Iniciar MongoDB

Asegúrate de que MongoDB esté ejecutándose:

```bash
mongod
```

### 2. Iniciar el servidor backend

En una terminal, desde la carpeta `backend`:

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:5000`

### 3. Agregar productos de ejemplo (opcional)

En otra terminal, desde la carpeta `backend`:

```bash
node seed.js
```

Esto agregará algunos productos de ejemplo a la base de datos.

### 4. Iniciar la aplicación frontend

En otra terminal, desde la carpeta `frontend`:

```bash
npm start
```

La aplicación se abrirá en `http://localhost:3000`

## Estructura del Proyecto

```
tienda-online/
├── backend/
│   ├── models/
│   │   └── Producto.js
│   ├── routes/
│   │   └── productos.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── seed.js
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── Carrito.js
        │   ├── Carrito.css
        │   ├── Catalogo.js
        │   ├── Catalogo.css
        │   ├── DetalleProducto.js
        │   ├── DetalleProducto.css
        │   ├── Header.js
        │   └── Header.css
        ├── services/
        │   └── api.js
        ├── App.js
        ├── App.css
        ├── index.js
        └── index.css
```

## API Endpoints

### Productos

- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener un producto por ID
- `POST /api/productos` - Crear un nuevo producto
- `PUT /api/productos/:id` - Actualizar un producto
- `DELETE /api/productos/:id` - Eliminar un producto

## Agregar Productos Manualmente

Puedes agregar productos usando POST a `http://localhost:5000/api/productos` con el siguiente formato:

```json
{
  "nombre": "Nombre del Producto",
  "descripcion": "Descripción detallada del producto",
  "precio": 99.99,
  "imagen": "URL de la imagen",
  "categoria": "Categoría",
  "stock": 10
}
```

## Próximas Mejoras

- Sistema de autenticación de usuarios
- Proceso de checkout completo
- Integración con pasarela de pago
- Panel de administración
- Historial de pedidos
- Búsqueda y filtros avanzados
- Wishlist/Lista de deseos

## Licencia

ISC
