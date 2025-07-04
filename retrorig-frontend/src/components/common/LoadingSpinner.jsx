// src/components/common/LoadingSpinner.jsx
import React from 'react'

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'blue', 
  text = 'Loading...', 
  showText = true,
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  const colorClasses = {
    blue: 'text-blue-500',
    gray: 'text-gray-500',
    green: 'text-green-500',
    red: 'text-red-500',
    purple: 'text-purple-500'
  }

  const SpinnerContent = () => (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}>
        <svg 
          className="w-full h-full" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      {showText && (
        <p className={`text-sm ${colorClasses[color]} font-medium`}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <SpinnerContent />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-4">
      <SpinnerContent />
    </div>
  )
}

// Skeleton loader for product cards
export const ProductSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
    <div className="bg-gray-300 h-48 rounded-md mb-4"></div>
    <div className="space-y-2">
      <div className="bg-gray-300 h-4 rounded w-3/4"></div>
      <div className="bg-gray-300 h-4 rounded w-1/2"></div>
      <div className="bg-gray-300 h-6 rounded w-1/4"></div>
    </div>
  </div>
)

// Skeleton loader for shop cards
export const ShopSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
    <div className="flex items-center space-x-4 mb-4">
      <div className="bg-gray-300 h-12 w-12 rounded-full"></div>
      <div className="space-y-2 flex-1">
        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
        <div className="bg-gray-300 h-3 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="bg-gray-300 h-3 rounded w-full"></div>
      <div className="bg-gray-300 h-3 rounded w-2/3"></div>
    </div>
  </div>
)

// List skeleton for multiple items
export const ListSkeleton = ({ count = 3, type = 'product' }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index}>
        {type === 'product' ? <ProductSkeleton /> : <ShopSkeleton />}
      </div>
    ))}
  </div>
)

export default LoadingSpinner