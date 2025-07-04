// src/components/common/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { 
  Search, 
  X, 
  Clock, 
  TrendingUp, 
  Filter,
  MapPin,
  DollarSign,
  Tag
} from 'lucide-react'
import { setFilters } from '../../store/slices/productSlice'

const SearchBar = ({ 
  placeholder = "Search for phones, laptops, tablets...",
  showFilters = true,
  onSearch,
  className = ""
}) => {
  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchRef = useRef(null)
  const { filters } = useSelector(state => state.products)

  // Mock popular searches and categories
  const popularSearches = [
    'iPhone 13', 'MacBook Pro', 'Samsung Galaxy', 'iPad Air', 
    'Gaming Laptop', 'Wireless Earbuds', 'Smart Watch', 'Tablet'
  ]

  const categories = [
    { name: 'Phones', icon: '📱', count: 1250 },
    { name: 'Laptops', icon: '💻', count: 890 },
    { name: 'Tablets', icon: '📲', count: 456 },
    { name: 'Accessories', icon: '🎧', count: 2100 },
    { name: 'Gaming', icon: '🎮', count: 340 },
    { name: 'Wearables', icon: '⌚', count: 220 }
  ]

  const conditionOptions = ['New', 'Like New', 'Good', 'Fair', 'Poor']
  const priceRanges = [
    { label: 'Under $100', min: 0, max: 100 },
    { label: '$100 - $300', min: 100, max: 300 },
    { label: '$300 - $500', min: 300, max: 500 },
    { label: '$500 - $1000', min: 500, max: 1000 },
    { label: 'Over $1000', min: 1000, max: 99999 }
  ]

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Handle search
  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return

    // Save to recent searches
    const newRecentSearches = [
      searchQuery,
      ...recentSearches.filter(item => item !== searchQuery)
    ].slice(0, 5)
    
    setRecentSearches(newRecentSearches)
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches))

    // Update filters in Redux
    dispatch(setFilters({ searchQuery }))
    
    // Navigate to products page or call onSearch prop
    if (onSearch) {
      onSearch(searchQuery)
    } else {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
    
    setShowSuggestions(false)
    setIsExpanded(false)
  }

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }))
  }

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Main Search Bar */}
      <div className={`relative transition-all duration-300 ${
        isExpanded ? 'transform scale-105' : ''
      }`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setShowSuggestions(true)
              setIsExpanded(true)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
              if (e.key === 'Escape') {
                setShowSuggestions(false)
                setIsExpanded(false)
              }
            }}
            placeholder={placeholder}
            className="w-full pl-10 pr-12 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Quick Filters */}
        {showFilters && (
          <div className="flex items-center space-x-3 mt-3">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filters</span>
            </button>
            
            {/* Active filters display */}
            {filters.category && (
              <div className="flex items-center space-x-1 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg">
                <Tag className="h-4 w-4" />
                <span className="text-sm">{filters.category}</span>
                <button
                  onClick={() => handleFilterChange('category', null)}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            
            {filters.priceRange && (
              <div className="flex items-center space-x-1 px-3 py-2 bg-green-100 text-green-800 rounded-lg">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">{filters.priceRange.label}</span>
                <button
                  onClick={() => handleFilterChange('priceRange', null)}
                  className="ml-1 hover:text-green-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            
            {filters.condition && (
              <div className="flex items-center space-x-1 px-3 py-2 bg-purple-100 text-purple-800 rounded-lg">
                <span className="text-sm">{filters.condition}</span>
                <button
                  onClick={() => handleFilterChange('condition', null)}
                  className="ml-1 hover:text-purple-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Recent Searches
                </h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Clock className="h-4 w-4 mr-3 text-gray-400" />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900 flex items-center mb-3">
              <TrendingUp className="h-4 w-4 mr-2" />
              Popular Searches
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <TrendingUp className="h-4 w-4 mr-3 text-gray-400" />
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleFilterChange('category', category.name)
                    setShowSuggestions(false)
                    setIsExpanded(false)
                  }}
                  className="flex items-center justify-between px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <span className="mr-3">{category.icon}</span>
                    {category.name}
                  </div>
                  <span className="text-xs text-gray-500">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filters Modal */}
      {showAdvancedFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Advanced Filters</h3>
            <button
              onClick={() => setShowAdvancedFilters(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="h-4 w-4 inline mr-1" />
                Price Range
              </label>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => handleFilterChange('priceRange', range)}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                      filters.priceRange?.label === range.label
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="h-4 w-4 inline mr-1" />
                Condition
              </label>
              <div className="space-y-2">
                {conditionOptions.map((condition, index) => (
                  <button
                    key={index}
                    onClick={() => handleFilterChange('condition', condition)}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                      filters.condition === condition
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                Location
              </label>
              <input
                type="text"
                placeholder="Enter city or ZIP code"
                value={filters.location || ''}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                dispatch(setFilters({}))
                setShowAdvancedFilters(false)
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setShowAdvancedFilters(false)}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar