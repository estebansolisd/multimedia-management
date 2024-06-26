import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();

  return token ? <>{children}</> : <Navigate to="/register" />;
};

export default PrivateRoute;
