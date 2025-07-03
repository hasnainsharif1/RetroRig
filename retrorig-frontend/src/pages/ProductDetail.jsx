import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock product data
      const mockProduct = {
        id: id,
        name: 'Premium Wireless Headphones',
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.5,
        reviewCount: 128,
        inStock: true,
        stockCount: 15,
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop'
        ],
        description: 'Experience premium sound quality with these state-of-the-art wireless headphones. Featuring advanced noise cancellation technology, premium materials, and exceptional comfort for all-day wear.',
        features: [
          'Active Noise Cancellation',
          '30-hour battery life',
          'Premium leather cushions',
          'Bluetooth 5.0 connectivity',
          'Quick charge: 5 min = 3 hours playback',
          'Voice assistant compatible'
        ],
        specifications: {
          'Driver Size': '40mm',
          'Frequency Response': '20Hz - 20kHz',
          'Impedance': '32 ohms',
          'Battery Life': '30 hours',
          'Weight': '250g',
          'Connectivity': 'Bluetooth 5.0, 3.5mm jack'
        },
        shop: {
          id: 1,
          name: 'TechStore Pro',
          rating: 4.8,
          totalProducts: 156
        }
      }
      
      setProduct(mockProduct)
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    // Add to cart logic
    alert(`Added ${quantity} ${product.name} to cart!`)
  }

  const handleBuyNow = () => {
    // Buy now logic
    alert(`Proceeding to checkout with ${quantity} ${product.name}`)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-gray-200 rounded-lg h-96"></div>
              <div className="flex space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-gray-200 rounded-md h-20 w-20"></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-200 rounded h-8 w-3/4"></div>
              <div className="bg-gray-200 rounded h-4 w-1/2"></div>
              <div className="bg-gray-200 rounded h-6 w-1/4"></div>
              <div className="bg-gray-200 rounded h-32 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <Link to="/products" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
              <span className="ml-2 text-gray-600">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            <p className="text-green-600 mt-2">
              {product.inStock ? `In stock (${product.stockCount} available)` : 'Out of stock'}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-600 hover:text-gray-900"
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="px-3 py-1 text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Shop Info */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-2">Sold by:</h3>
            <Link to={`/shops/${product.shop.id}`} className="flex items-center space-x-3 hover:bg-gray-50 p-3 rounded-lg transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">{product.shop.name}</p>
                <p className="text-sm text-gray-600">★ {product.shop.rating} • {product.shop.totalProducts} products</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="mb-8">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-900">{key}:</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
            <p className="mt-1 text-sm text-gray-500">Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail