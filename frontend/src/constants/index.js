/**
 * Application Constants
 */

// API Configuration
export const API_BASE_URL = '/api'
export const API_TIMEOUT = 10000

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user'
}

// Route Paths
export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  ELIGIBLE_SCHEMES: '/eligible-schemes',
  ALL_SCHEMES: '/all-schemes',
  ADD_SCHEME: '/add-scheme'
}

// Caste Categories
export const CASTE_CATEGORIES = [
  { value: 'GENERAL', label: 'General' },
  { value: 'OBC', label: 'OBC' },
  { value: 'SC', label: 'SC' },
  { value: 'ST', label: 'ST' },
  { value: 'ALL', label: 'All' }
]

// Occupations
export const OCCUPATIONS = [
  'Student',
  'Employed',
  'Self-Employed',
  'Unemployed',
  'Farmer',
  'Retired',
  'Other'
]

// Common States in India
export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
]

// Messages
export const MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTRATION_SUCCESS: 'Registration successful! Please login.',
  PROFILE_UPDATED: 'Profile updated successfully!',
  SCHEME_CREATED: 'Scheme created successfully!',
  GENERIC_ERROR: 'An error occurred. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.'
}

// User Roles
export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN'
}

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
}
