import React, { createContext, useContext, useState } from 'react'
import { mockShops } from '../data/mockShops'

const ShopContext = createContext()

export const useShops = () => {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShops must be used within a ShopProvider')
  }
  return context
}

export const ShopProvider = ({ children }) => {
  const [shops, setShops] = useState(mockShops)
  const [loading, setLoading] = useState(false)

  // Get shop by ID
  const getShopById = (id) => {
    return shops.find(shop => shop.id === parseInt(id))
  }

  // Register new shop
  const registerShop = (shopData) => {
    const newShop = {
      id: Date.now(),
      ...shopData,
      rating: 0,
      totalProducts: 0,
      verified: false,
      productIds: []
    }
    setShops(prev => [newShop, ...prev])
    return newShop
  }

  // Get shops by location
  const getShopsByLocation = (location) => {
    return shops.filter(shop => shop.location === location)
  }

  // Get featured/top shops
  const getFeaturedShops = () => {
    return shops
      .filter(shop => shop.verified)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6)
  }

  const value = {
    shops,
    loading,
    getShopById,
    registerShop,
    getShopsByLocation,
    getFeaturedShops
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}