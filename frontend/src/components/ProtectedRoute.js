import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirigir a login si no hay token
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
