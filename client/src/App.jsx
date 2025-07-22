import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import AuthPage from "./features/auth/AuthPage";
import HomePage from "./features/home/HomePage";
import TeamPage from "./features/team/TeamPage";
import TransferMarketPage from "./features/transfer/TransferMarketPage";
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
        <Route
          path="/my-team"
          element={
            <ProtectedRoute>
              <TeamPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transfer-market"
          element={
            <ProtectedRoute>
              <TransferMarketPage />
            </ProtectedRoute>
          }
        />
     
      </Routes>
    </>
  );
};
export default App;
