import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    logout(() => {
      navigate("/login");
    });
  };
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl">Media Management</h1>
      <nav className="flex gap-4 w-full justify-end items-center">
        {token ? (
          <button
            className="bg-red-700	text-white p-2"
            onClick={handleClick}
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-4">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
