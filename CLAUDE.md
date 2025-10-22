# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack e-commerce application with a React frontend and Node.js/Express backend, using MongoDB (MongoDB Atlas) for data persistence. The application includes a product catalog, shopping cart, product details, and an admin panel for product management.

## Architecture

### Monorepo Structure
- **`backend/`**: Express API server with MongoDB/Mongoose
- **`frontend/`**: Create React App with React Router

### Backend (`backend/`)
- **Entry point**: `server.js` - Express server with CORS enabled
- **Models**: `models/Producto.js` - Mongoose schema for products
- **Routes**: `routes/productos.js` - RESTful API endpoints for product CRUD operations
- **Database seeding**: `seed.js` - Script to populate database with sample products
- **Environment**: `.env` file with `PORT` and `MONGODB_URI` (MongoDB Atlas connection string)

The backend uses `mongoose.connect()` directly in `server.js` without additional configuration.

### Frontend (`frontend/src/`)
- **Router setup**: `App.js` - React Router with routes for catalog, product details, cart, and admin
- **State management**: Local state using `useState` in `App.js` for cart functionality
- **API layer**: `services/api.js` - Axios wrapper pointing to production backend URL
- **Components**:
  - `Header.js` - Navigation with cart badge
  - `Catalogo.js` - Product grid with search/filter
  - `DetalleProducto.js` - Individual product page
  - `Carrito.js` - Shopping cart with quantity management
  - `Admin.js` - Admin panel for CRUD operations on products

### Key Architecture Decisions
1. **API URL**: `frontend/src/services/api.js` hardcodes the production backend URL (`https://tienda-online-backed.onrender.com/api`). When making changes, update this for local development if needed.
2. **Admin panel**: `Admin.js` also hardcodes fetch URLs directly (not using the api.js service for PUT/DELETE operations).
3. **Cart state**: Cart is managed in `App.js` and passed down as props (no Context API or Redux).
4. **Routing**: Uses React Router v6 with `/`, `/producto/:id`, `/carrito`, and `/admin` routes.

## Development Commands

### Backend
```bash
cd backend
npm install                  # Install dependencies
npm run dev                  # Start with nodemon (auto-reload)
npm start                    # Start production server
node seed.js                 # Seed database with sample products
```

### Frontend
```bash
cd frontend
npm install                  # Install dependencies
npm start                    # Start dev server (localhost:3000)
npm run build                # Build for production
npm test                     # Run tests
```

## Environment Configuration

### Backend `.env`
Required variables:
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB Atlas connection string

**Important**: The current setup uses MongoDB Atlas (cloud). The connection string includes credentials and cluster information.

## API Endpoints

Base URL (production): `https://tienda-online-backed.onrender.com/api`

- `GET /productos` - List all products
- `GET /productos/:id` - Get single product
- `POST /productos` - Create product
- `PUT /productos/:id` - Update product
- `DELETE /productos/:id` - Delete product

## Database Schema

**Producto** (Product):
- `nombre` (String, required)
- `descripcion` (String, required)
- `precio` (Number, required, min: 0)
- `imagen` (String, required) - URL to product image
- `categoria` (String, required)
- `stock` (Number, required, min: 0)
- `timestamps` - Mongoose timestamps (createdAt, updatedAt)

## Deployment

- **Backend**: Deployed on Render at `tienda-online-backed.onrender.com`
- **Frontend**: Deployed on Vercel
- **Database**: MongoDB Atlas

When deploying:
1. Ensure MongoDB Atlas allows connections from deployment IPs (or 0.0.0.0/0)
2. Frontend API URL is already configured for production backend
3. Vercel auto-deploys from the `main` branch (root directory is `frontend/`)

## Important Notes

- The frontend makes API calls to the production backend by default. For local development with a local backend, change `API_URL` in `frontend/src/services/api.js` to `http://localhost:5000/api`.
- The `Admin.js` component bypasses `api.js` for PUT/DELETE operations and uses direct fetch calls. Consider refactoring for consistency.
- Cart state is not persisted (resets on page reload).
