// Application-wide constants
export const APP_NAME = 'RetroRig'
export const APP_DESCRIPTION = 'Pakistan\'s Premier Tech Marketplace'

// API endpoints (when backend is ready)
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'

// Product conditions
export const PRODUCT_CONDITIONS = ['New', 'Used - Like New', 'Used - Good', 'Used - Fair']

// Price ranges for filtering
export const PRICE_RANGES = [
  { label: 'Under Rs. 10,000', min: 0, max: 10000 },
  { label: 'Rs. 10,000 - 50,000', min: 10000, max: 50000 },
  { label: 'Rs. 50,000 - 100,000', min: 50000, max: 100000 },
  { label: 'Rs. 100,000 - 300,000', min: 100000, max: 300000 },
  { label: 'Above Rs. 300,000', min: 300000, max: Infinity }
]

// Pagination
export const PRODUCTS_PER_PAGE = 12
export const SHOPS_PER_PAGE = 8

// Image upload limits
export const MAX_IMAGES_PER_PRODUCT = 5
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB