import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "./LoadSpinner";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
