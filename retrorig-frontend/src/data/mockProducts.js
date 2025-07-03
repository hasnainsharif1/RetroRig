// Mock product data for development and testing
export const mockProducts = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max 256GB',
    price: 450000,
    condition: 'New',
    category: 'mobiles',
    subcategory: 'iPhone',
    location: 'Lahore',
    description: 'Brand new iPhone 15 Pro Max with 1 year warranty',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    sellerId: 1,
    sellerName: 'Ahmed Electronics',
    sellerType: 'shop',
    createdAt: '2024-01-15',
    featured: true,
    specifications: {
      storage: '256GB',
      ram: '8GB',
      color: 'Natural Titanium'
    }
  },
  {
    id: 2,
    title: 'MacBook Air M2 2022',
    price: 280000,
    condition: 'Used',
    category: 'laptops',
    subcategory: 'Ultrabooks',
    location: 'Karachi',
    description: 'Excellent condition MacBook Air, barely used',
    images: ['/api/placeholder/400/300'],
    sellerId: 2,
    sellerName: 'Tech Reseller',
    sellerType: 'individual',
    createdAt: '2024-01-10',
    featured: false,
    specifications: {
      processor: 'Apple M2',
      ram: '8GB',
      storage: '256GB SSD'
    }
  },
  {
    id: 3,
    title: 'Samsung Galaxy S24 Ultra',
    price: 320000,
    condition: 'New',
    category: 'mobiles',
    subcategory: 'Android',
    location: 'Islamabad',
    description: 'Latest Samsung flagship with S Pen',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    sellerId: 3,
    sellerName: 'Mobile World',
    sellerType: 'shop',
    createdAt: '2024-01-12',
    featured: true,
    specifications: {
      storage: '512GB',
      ram: '12GB',
      color: 'Titanium Gray'
    }
  }
]