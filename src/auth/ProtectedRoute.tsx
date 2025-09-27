import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ roles }:{ roles: string[] }){
  const { user, hasRole } = useAuth();
  if(!user) return <Navigate to="/login" replace/>;
  return hasRole(...roles) ? <Outlet/> : <Navigate to="/" replace/>;
}
