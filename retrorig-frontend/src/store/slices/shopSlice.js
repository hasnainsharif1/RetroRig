// src/store/slices/shopSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunks for API calls
export const fetchShops = createAsyncThunk(
  'shops/fetchShops',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(params).toString()
      const response = await fetch(`/api/shops?${queryParams}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch shops')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchShopById = createAsyncThunk(
  'shops/fetchShopById',
  async (shopId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/shops/${shopId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch shop')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createShop = createAsyncThunk(
  'shops/createShop',
  async (shopData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/shops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(shopData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create shop')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateShop = createAsyncThunk(
  'shops/updateShop',
  async ({ id, shopData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/shops/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(shopData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update shop')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteShop = createAsyncThunk(
  'shops/deleteShop',
  async (shopId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/shops/${shopId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete shop')
      }
      
      return shopId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  shops: [],
  currentShop: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    location: '',
    searchQuery: '',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12,
  },
}

const shopSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        location: '',
        searchQuery: '',
      }
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload
    },
    clearCurrentShop: (state) => {
      state.currentShop = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch shops cases
      .addCase(fetchShops.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.loading = false
        state.shops = action.payload.shops
        state.pagination = {
          ...state.pagination,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalItems,
        }
        state.error = null
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch shop by ID cases
      .addCase(fetchShopById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchShopById.fulfilled, (state, action) => {
        state.loading = false
        state.currentShop = action.payload
        state.error = null
      })
      .addCase(fetchShopById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create shop cases
      .addCase(createShop.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.loading = false
        state.shops.unshift(action.payload)
        state.error = null
      })
      .addCase(createShop.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update shop cases
      .addCase(updateShop.fulfilled, (state, action) => {
        const index = state.shops.findIndex(s => s.id === action.payload.id)
        if (index !== -1) {
          state.shops[index] = action.payload
        }
        if (state.currentShop?.id === action.payload.id) {
          state.currentShop = action.payload
        }
      })
      // Delete shop cases
      .addCase(deleteShop.fulfilled, (state, action) => {
        state.shops = state.shops.filter(s => s.id !== action.payload)
        if (state.currentShop?.id === action.payload) {
          state.currentShop = null
        }
      })
  },
})

export const { 
  clearError, 
  setFilters, 
  clearFilters, 
  setCurrentPage, 
  clearCurrentShop 
} = shopSlice.actions

export default shopSlice.reducer