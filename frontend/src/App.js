import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroCarousel from "./components/HeroCarousel";
import TrainList from "./components/TrainList";
import Dashboard from "./components/Dashboard";
import BookingsPage from "./components/BookingsPage";
import ProtectedRoute from "./routes/ProtectedRoute";

import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";

function AppContent() {
  const [showAuth, setShowAuth] = useState({ type: null });
  const navigate = useNavigate();

  return (
    <>
      <AppNavbar
        onLogin={() => setShowAuth({ type: "login" })}
        onRegister={() => setShowAuth({ type: "register" })}
        onGotoDashboard={() => navigate("/dashboard")}
      />

      <div className="mt-nav-space">
        <HeroCarousel />
        <div className="container-app">
          <Routes>
            <Route path="/" element={<TrainList />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <BookingsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<TrainList />} />
          </Routes>
        </div>
      </div>

      <Footer />

      <LoginModal
        show={showAuth.type === "login"}
        onClose={() => setShowAuth({ type: null })}
      />
      <RegisterModal
        show={showAuth.type === "register"}
        onClose={() => setShowAuth({ type: null })}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
