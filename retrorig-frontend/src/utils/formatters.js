// Text and data formatting utilities

// Format phone number for display
export const formatPhoneNumber = (phone) => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as +92 3XX XXX XXXX
  if (cleaned.length === 11 && cleaned.startsWith('03')) {
    return `+92 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
  }
  
  return phone
}

// Format file size for display
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Capitalize first letter of each word
export const capitalizeWords = (str) => {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

// Format product condition with color coding info
export const formatCondition = (condition) => {
  const conditionMap = {
    'New': { text: 'New', color: 'green' },
    'Used - Like New': { text: 'Like New', color: 'blue' },
    'Used - Good': { text: 'Good', color: 'yellow' },
    'Used - Fair': { text: 'Fair', color: 'orange' }
  }
  
  return conditionMap[condition] || { text: condition, color: 'gray' }
}

// Format compact number (e.g., 1.5K, 2.3M)
export const formatCompactNumber = (num) => {
  if (num < 1000) return num.toString()
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K'
  return (num / 1000000).toFixed(1) + 'M'
}