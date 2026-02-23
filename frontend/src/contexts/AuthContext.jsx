import React, { createContext, useContext, useState } from "react";
import api from "../api/axios";

// Create context and export it (optional, can use hook only)
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check if token exists in localStorage
  const isAuth = !!localStorage.getItem("accessToken");

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", credentials);

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuth,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming auth context
export const useAuth = () => useContext(AuthContext);