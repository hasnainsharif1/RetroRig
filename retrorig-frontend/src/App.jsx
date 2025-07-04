// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Layout Components
import Header from './components/common/Header'
import Footer from './components/common/Footer'

// Page Components
import Home from './pages/Home'
import ProductListing from './pages/ProductListing'
import ProductDetail from './pages/ProductDetail'
import ShopListing from './pages/ShopListing'
import ShopDetail from './pages/ShopDetail'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import SellProduct from './pages/SellProduct'
import RegisterShop from './pages/RegisterShop'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/shops" element={<ShopListing />} />
          <Route path="/shops/:id" element={<ShopDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sell" element={<SellProduct />} />
          <Route path="/register-shop" element={<RegisterShop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}

export default App