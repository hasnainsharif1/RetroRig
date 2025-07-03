import React from 'react'

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Welcome to our marketplace - a platform connecting buyers and sellers 
            in a seamless, user-friendly environment.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            We aim to create a trusted marketplace where businesses can showcase 
            their products and customers can discover exactly what they're looking for.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Easy product listing and management for sellers</li>
            <li>Comprehensive search and filtering for buyers</li>
            <li>Secure shop registration and verification</li>
            <li>User-friendly interface for all experience levels</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get Started</h2>
          <p className="text-gray-700">
            Whether you're looking to buy or sell, our platform makes it easy to 
            get started. Browse our products, discover new shops, or register your 
            own business today.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About