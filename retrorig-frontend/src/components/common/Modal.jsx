// src/components/common/Modal.jsx
import React, { useEffect } from 'react'
import { X } from 'lucide-react'

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscapeKey = true
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-full mx-4'
  }

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscapeKey) return

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, closeOnEscapeKey])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div 
        className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b">
            {title && (
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

// Confirmation Modal
export const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning' // 'warning', 'danger', 'info'
}) => {
  const typeStyles = {
    warning: {
      icon: '⚠️',
      confirmBtn: 'bg-yellow-500 hover:bg-yellow-600 text-white'
    },
    danger: {
      icon: '🗑️',
      confirmBtn: 'bg-red-500 hover:bg-red-600 text-white'
    },
    info: {
      icon: 'ℹ️',
      confirmBtn: 'bg-blue-500 hover:bg-blue-600 text-white'
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className="text-4xl mb-4">
          {typeStyles[type].icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-md transition-colors ${typeStyles[type].confirmBtn}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}

// Product Detail Modal
export const ProductDetailModal = ({ isOpen, onClose, product }) => {
  if (!product) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" title={product.name}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <img 
            src={product.image || '/api/placeholder/400/300'} 
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="grid grid-cols-3 gap-2">
            {product.additionalImages?.map((img, idx) => (
              <img 
                key={idx}
                src={img || '/api/placeholder/120/80'} 
                alt={`${product.name} ${idx + 1}`}
                className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75"
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">${product.price}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Condition</h4>
            <span className={`px-3 py-1 rounded-full text-sm ${
              product.condition === 'Excellent' ? 'bg-green-100 text-green-800' :
              product.condition === 'Good' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {product.condition}
            </span>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Specifications</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {product.specifications?.map((spec, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{spec.label}:</span>
                  <span className="font-medium">{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
              Contact Seller
            </button>
            <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Modal