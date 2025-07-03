import React from 'react';
import { MapPin, Store, User } from 'lucide-react';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
            {product.condition}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {product.location}
          </div>
          <div className="flex items-center">
            {product.isShop ? (
              <>
                <Store className="w-4 h-4 mr-1" />
                Shop
              </>
            ) : (
              <>
                <User className="w-4 h-4 mr-1" />
                Individual
              </>
            )}
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-700">
          Seller: {product.seller}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;