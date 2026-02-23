import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OtpVerify from "./pages/OtpVerify";
import ProductDetails from './pages/ProductDetails';
import Navbar from './components/Navbar';
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <>
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* actual Home */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </AuthProvider>
    </>
  );
}