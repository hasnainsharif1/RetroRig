// Mock shop data for development
export const mockShops = [
  {
    id: 1,
    name: 'Ahmed Electronics',
    description: 'Premium mobile phones and accessories',
    location: 'Lahore',
    address: 'Hall Road, Lahore',
    phone: '+92 300 1234567',
    email: 'ahmed@electronics.com',
    rating: 4.5,
    totalProducts: 45,
    establishedYear: 2018,
    logo: '/api/placeholder/100/100',
    coverImage: '/api/placeholder/800/300',
    categories: ['mobiles', 'accessories'],
    verified: true,
    productIds: [1, 4, 7] // References to products sold by this shop
  },
  {
    id: 2,
    name: 'Tech Hub Karachi',
    description: 'Laptops, computers and tech accessories',
    location: 'Karachi',
    address: 'Saddar, Karachi',
    phone: '+92 321 9876543',
    email: 'info@techhub.com',
    rating: 4.2,
    totalProducts: 32,
    establishedYear: 2020,
    logo: '/api/placeholder/100/100',
    coverImage: '/api/placeholder/800/300',
    categories: ['laptops', 'accessories'],
    verified: true,
    productIds: [5, 6, 8]
  },
  {
    id: 3,
    name: 'Mobile World',
    description: 'Latest smartphones and mobile accessories',
    location: 'Islamabad',
    address: 'Blue Area, Islamabad',
    phone: '+92 333 5555555',
    email: 'contact@mobileworld.com',
    rating: 4.7,
    totalProducts: 67,
    establishedYear: 2015,
    logo: '/api/placeholder/100/100',
    coverImage: '/api/placeholder/800/300',
    categories: ['mobiles', 'tablets', 'accessories'],
    verified: true,
    productIds: [3, 9, 10]
  }
]