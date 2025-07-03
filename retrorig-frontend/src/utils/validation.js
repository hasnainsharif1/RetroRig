// Form validation functions

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate Pakistani phone number
export const validatePhone = (phone) => {
  const phoneRegex = /^(\+92|0)?3[0-9]{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Validate password strength
export const validatePassword = (password) => {
  return {
    isValid: password.length >= 8,
    errors: {
      minLength: password.length < 8,
      hasNumber: !/\d/.test(password),
      hasLetter: !/[a-zA-Z]/.test(password)
    }
  }
}

// Validate product form
export const validateProductForm = (formData) => {
  const errors = {}
  
  if (!formData.title?.trim()) {
    errors.title = 'Product title is required'
  }
  
  if (!formData.price || formData.price <= 0) {
    errors.price = 'Valid price is required'
  }
  
  if (!formData.category) {
    errors.category = 'Category is required'
  }
  
  if (!formData.condition) {
    errors.condition = 'Condition is required'
  }
  
  if (!formData.description?.trim()) {
    errors.description = 'Description is required'
  }
  
  if (!formData.location) {
    errors.location = 'Location is required'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Validate shop registration form
export const validateShopForm = (formData) => {
  const errors = {}
  
  if (!formData.name?.trim()) {
    errors.name = 'Shop name is required'
  }
  
  if (!formData.description?.trim()) {
    errors.description = 'Shop description is required'
  }
  
  if (!formData.phone || !validatePhone(formData.phone)) {
    errors.phone = 'Valid phone number is required'
  }
  
  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Valid email is required'
  }
  
  if (!formData.address?.trim()) {
    errors.address = 'Address is required'
  }
  
  if (!formData.location) {
    errors.location = 'City is required'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}