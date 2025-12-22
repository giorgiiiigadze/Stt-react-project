import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, userLoading } = useUser();

  if (userLoading) return null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
