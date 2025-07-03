import React, { createContext, useContext, useState, useEffect } from 'react'
import { mockProducts } from '../data/mockProducts'

// Product context for managing product-related state
const ProductContext = createContext()

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}

export const ProductProvider = ({ children }) => {
  // Products state management
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    minPrice: 0,
    maxPrice: Infinity,
    condition: '',
    location: '',
    searchQuery: ''
  })

  // Apply filters whenever filters or products change
  useEffect(() => {
    applyFilters()
  }, [filters, products])

  // Filter products based on current filter state
  const applyFilters = () => {
    let filtered = products.filter(product => {
      // Search query filter
      if (filters.searchQuery && 
          !product.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false
      }

      // Subcategory filter
      if (filters.subcategory && product.subcategory !== filters.subcategory) {
        return false
      }

      // Price range filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false
      }

      // Condition filter
      if (filters.condition && product.condition !== filters.condition) {
        return false
      }

      // Location filter
      if (filters.location && product.location !== filters.location) {
        return false
      }

      return true
    })

    setFilteredProducts(filtered)
  }

  // Update specific filter
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: '',
      subcategory: '',
      minPrice: 0,
      maxPrice: Infinity,
      condition: '',
      location: '',
      searchQuery: ''
    })
  }

  // Get product by ID
  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id))
  }

  // Add new product (when user lists a product)
  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      createdAt: new Date().toISOString().split('T')[0],
      featured: false
    }
    setProducts(prev => [newProduct, ...prev])
    return newProduct
  }

  // Get featured products for homepage
  const getFeaturedProducts = () => {
    return products.filter(product => product.featured).slice(0, 8)
  }

  // Get products by category
  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category)
  }

  const value = {
    products,
    filteredProducts,
    loading,
    filters,
    updateFilter,
    clearFilters,
    getProductById,
    addProduct,
    getFeaturedProducts,
    getProductsByCategory
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}