import axios from 'axios'

const API_BASE_URL = '/api'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL
})

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Auth APIs
export const authAPI = {
  register: (name, email, password) =>
    apiClient.post('/auth/register', { name, email, password }),
  
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password })
}

// Profile APIs
export const profileAPI = {
  createProfile: (profileData) =>
    apiClient.post('/profile', profileData),
  
  getProfile: () =>
    apiClient.get('/profile/me')
}

// Scheme APIs
export const schemeAPI = {
  getAllSchemes: () =>
    apiClient.get('/schemes'),
  
  getEligibleSchemes: () =>
    apiClient.get('/schemes/eligible'),
  
  createScheme: (schemeData) =>
    apiClient.post('/schemes', schemeData),
  
  getSchemeById: (id) =>
    apiClient.get(`/schemes/${id}`)
}

export default apiClient
