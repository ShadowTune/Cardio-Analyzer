// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user || JSON.parse(user)?.id === 'guest') {
    return <Navigate to="/login" replace />;
  }

  return children;
}
