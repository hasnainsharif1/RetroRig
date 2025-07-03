import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ShopListing() {
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000)) // simulate loading

      // Mocked shop list
      const mockShops = [
        {
          id: '1',
          name: 'TechStore Pro',
          logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop',
          banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=300&fit=crop',
          rating: 4.8,
          reviewCount: 342
        },
        {
          id: '2',
          name: 'Gadget Hub',
          logo: 'https://images.unsplash.com/photo-1581291518835-ec5e9fe3f3e1?w=200&h=200&fit=crop',
          banner: 'https://images.unsplash.com/photo-1580910051073-b7e5cb5f25f4?w=1200&h=300&fit=crop',
          rating: 4.5,
          reviewCount: 280
        }
      ]

      setShops(mockShops)
      setLoading(false)
    }

    fetchShops()
  }, [])

  if (loading) {
    return <div className="text-center py-20">Loading shops...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Shops</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map(shop => (
          <Link to={`/shops/${shop.id}`} key={shop.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
            <div className="h-32 bg-gray-100">
              <img src={shop.banner} alt={shop.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center p-4">
              <img src={shop.logo} alt={shop.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow -mt-8" />
              <div className="ml-4">
                <h2 className="text-lg font-bold text-gray-900">{shop.name}</h2>
                <p className="text-sm text-gray-600">{shop.rating} ⭐ ({shop.reviewCount} reviews)</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ShopListing
