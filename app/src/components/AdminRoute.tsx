import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();

  return user?.role === "admin" ? <>{children}</> : user ? <Navigate to="/" /> : <Navigate to="/register" /> ;
};

export default AdminRoute;
