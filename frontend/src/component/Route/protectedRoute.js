import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAdmin, children }) {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.users
  );

  if (loading === false) {
    if (isAuthenticated === false) {
      return <Navigate to="/login" />;
    }

    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/login" />;
    }

    return children;
  }
}

export default ProtectedRoute;
