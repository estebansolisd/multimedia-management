import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();

  return !user ? <>{children}</> : <Navigate to="/" />;
};

export default PublicRoute;
