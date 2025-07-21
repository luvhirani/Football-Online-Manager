import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import AuthPage from "./features/auth/AuthPage";
import HomePage from "./features/home/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <NavBar />
      <ToastContainer />

      <Routes>
      <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navigate to="/home" />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
export default App;
