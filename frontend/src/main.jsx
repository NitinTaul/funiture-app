// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from "./contexts/CartContext";
import { LikesProvider } from "./contexts/LikesContext";
import './index.css'

createRoot(document.getElementById('root')).render(
  <Provider>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <LikesProvider>
            <App />
          </LikesProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
)
