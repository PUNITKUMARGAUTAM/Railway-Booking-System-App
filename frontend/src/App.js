import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  // ✅ Test toast trigger
  const showTestToast = () => {
    toast.success("This is a test toast!");
  };

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

          {/* ✅ Test Button */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={showTestToast}>Show Test Toast</button>
          </div>
        </div>
      </div>

      <Footer />

      {/* ✅ ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

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
