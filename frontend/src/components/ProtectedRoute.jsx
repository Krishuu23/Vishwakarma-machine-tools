import {jwtDecode}from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) return <Navigate to="/admin" replace />;

  // ✅ decode expiry from token
  const decoded = jwtDecode(token);
  const isExpired = decoded.exp * 1000 < Date.now();

  if (isExpired) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
