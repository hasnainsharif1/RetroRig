import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Smartphone, Laptop, Headphones, ShoppingBag, Store, Users } from 'lucide-react'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Tech Deal
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Buy and sell mobiles, laptops, and tech accessories in Pakistan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Products
            </Link>
            <Link 
              to="/sell" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Sell Your Product
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/products?category=mobiles" className="group">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 text-center">
                <Smartphone className="w-16 h-16 text-primary-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">Mobile Phones</h3>
                <p className="text-gray-600">Latest smartphones and feature phones</p>
              </div>
            </Link>
            
            <Link to="/products?category=laptops" className="group">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 text-center">
                <Laptop className="w-16 h-16 text-primary-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">Laptops</h3>
                <p className="text-gray-600">Gaming, business, and ultrabooks</p>
              </div>
            </Link>
            
            <Link to="/products?category=accessories" className="group">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 text-center">
                <Headphones className="w-16 h-16 text-primary-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">Accessories</h3>
                <p className="text-gray-600">Chargers, cases, cables, and more</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <ShoppingBag className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Products Listed</p>
            </div>
            <div>
              <Store className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Registered Shops</p>
            </div>
            <div>
              <Users className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50,000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of sellers and grow your business with RetroRig
          </p>
          <Link 
            to="/register-shop" 
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Register Your Shop
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home