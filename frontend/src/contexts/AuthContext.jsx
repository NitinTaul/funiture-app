// src/contexts/AuthContext.jsx
"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/api'
import { toaster } from "@/components/ui/toaster"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      api.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => {
          // handle if /auth/me fails or is not available
        })
    }
  }, [token])

  const login = async (credentials) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', credentials)
      localStorage.setItem('token', res.data.token)
      setToken(res.data.token)
      setUser(res.data.user || null)

      toaster.create({
        title: "Logged in successfully",
        type: "success",
      })

      setLoading(false)
      return res.data
    } catch (err) {
      setLoading(false)
      toaster.create({
        title: err?.response?.data?.message || "Login failed",
        type: "error",
      })
      throw err
    }
  }

  const signup = async (data) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/register', data)
      localStorage.setItem('token', res.data.token)
      setToken(res.data.token)
      setUser(res.data.user || null)

      toaster.create({
        title: "Account created successfully",
        type: "success",
      })

      setLoading(false)
      return res.data
    } catch (err) {
      setLoading(false)
      toaster.create({
        title: err?.response?.data?.message || "Signup failed",
        type: "error",
      })
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)

    toaster.create({
      title: "Logged out successfully",
      type: "info",
    })
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
