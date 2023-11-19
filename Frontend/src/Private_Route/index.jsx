import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticated, redirectTo }) => {
  return isAuthenticated ? (
    <Routes>
      {" "}
      <Route element={element} />
    </Routes>
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default PrivateRoute;
