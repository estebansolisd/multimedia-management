import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
console.log(token, "token");

  return !token ? <>{children}</> : <Navigate to="/" />;
};

export default PublicRoute;
