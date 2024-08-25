import React from "react";
import { Navigate } from "react-router-dom";
import { AuthFormGlobalState } from "../../components/Layout/AuthFormGlobalState";

function ProtectedRoute({ children, requiredRole }) {
  const { authForm } = AuthFormGlobalState();
  return authForm === requiredRole ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
}

export default ProtectedRoute;
