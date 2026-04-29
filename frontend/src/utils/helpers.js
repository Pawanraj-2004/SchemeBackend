/**
 * Utility functions for the application
 */

/**
 * Format currency to Indian Rupees
 * @param {number} amount 
 * @returns {string} Formatted amount
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount)
}

/**
 * Check if user token exists
 * @returns {boolean}
 */
export const hasToken = () => {
  return !!localStorage.getItem('token')
}

/**
 * Get stored token
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem('token')
}

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get API error message
 * @param {object} error - Axios error object
 * @returns {string}
 */
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.response?.data) {
    return error.response.data
  }
  if (error.message) {
    return error.message
  }
  return 'An unexpected error occurred'
}

/**
 * Debounce function
 * @param {function} func
 * @param {number} wait
 * @returns {function}
 */
export const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

/**
 * Check if scheme matches user profile
 * @param {object} scheme
 * @param {object} profile
 * @returns {boolean}
 */
export const isEligibleForScheme = (scheme, profile) => {
  if (!profile) return false

  // Check income
  if (profile.income < scheme.minIncome || profile.income > scheme.maxIncome) {
    return false
  }

  // Check age
  if (profile.age < scheme.minAge || profile.age > scheme.maxAge) {
    return false
  }

  // Check caste
  if (scheme.caste !== 'ALL' && scheme.caste !== profile.caste) {
    return false
  }

  // Check state
  if (scheme.state !== 'ALL' && scheme.state !== profile.state) {
    return false
  }

  // Check occupation
  if (scheme.occupation !== profile.occupation) {
    return false
  }

  return true
}
