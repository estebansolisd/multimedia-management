import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import CreateContent from "./components/CreateContent";
import AdminRoute from "./components/AdminRoute";
import CreateCategory from "./components/CreateCategory";
import CreateTheme from "./components/CreateTheme";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <div className="container mx-auto p-4">
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create/content"
                element={
                  <PrivateRoute>
                    <CreateContent />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create/category"
                element={
                  <AdminRoute>
                    <CreateCategory />
                  </AdminRoute>
                }
              />
              <Route
                path="/create/theme"
                element={
                  <AdminRoute>
                    <CreateTheme />
                  </AdminRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
