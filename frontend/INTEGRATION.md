# Frontend-Backend Integration Guide

This document explains how the React frontend communicates with the Spring Boot backend for the Scheme Management System.

## Architecture Overview

```
┌─────────────────────┐
│   React Frontend    │
│   (port 3000)       │
└──────────┬──────────┘
           │
           │ HTTP/HTTPS
           │ (with JWT Token)
           ↓
┌─────────────────────┐
│  Spring Boot API    │
│   (port 8080)       │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   MySQL Database    │
└─────────────────────┘
```

## API Communication

### Base Configuration

**Frontend:** `vite.config.js`
```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
```

**API Client:** `src/services/api.js`
```javascript
const API_BASE_URL = '/api'
const apiClient = axios.create({
  baseURL: API_BASE_URL
})

// Automatically adds Bearer token to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

---

## API Endpoints Reference

### 1. Authentication APIs

#### Register User

**Endpoint:** `POST /api/auth/register`

**Frontend Implementation:**
```javascript
// src/services/api.js
authAPI.register(name, email, password)

// src/components/Register.jsx
const response = await authAPI.register(
  formData.name,
  formData.email,
  formData.password
)
```

**Request Payload:**
```json
{
  "name": "Pawan",
  "email": "pawan@test.com",
  "password": "123456"
}
```

**Expected Response:**
```json
"success message / string"
```

**Error Handling:**
```javascript
catch (err) {
  setError(err.response?.data?.message || 'Registration failed')
}
```

---

#### Login User

**Endpoint:** `POST /api/auth/login`

**Frontend Implementation:**
```javascript
// src/services/api.js
authAPI.login(email, password)

// src/components/Login.jsx
const response = await authAPI.login(formData.email, formData.password)
const token = response.data
login(token) // Save token using AuthContext
```

**Request Payload:**
```json
{
  "email": "pawan@test.com",
  "password": "123456"
}
```

**Expected Response:**
```json
"Bearer eyJhbGciOiJIUzI1NiIs..."
```

**Token Storage:**
```javascript
localStorage.setItem('token', token)
```

---

### 2. Profile APIs

#### Create/Update Profile

**Endpoint:** `POST /api/profile`

**Frontend Implementation:**
```javascript
// src/services/api.js
profileAPI.createProfile(profileData)

// src/components/Profile.jsx
const response = await profileAPI.createProfile(formData)
```

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Payload:**
```json
{
  "age": 24,
  "income": 250000,
  "caste": "OBC",
  "occupation": "Student",
  "state": "Madhya Pradesh"
}
```

**Expected Response:**
```json
{
  "id": 1,
  "name": "Pawan",
  "email": "pawan@test.com",
  "age": 24,
  "income": 250000,
  "caste": "OBC",
  "occupation": "Student",
  "state": "Madhya Pradesh"
}
```

---

#### Get User Profile

**Endpoint:** `GET /api/profile/me`

**Frontend Implementation:**
```javascript
// src/services/api.js
profileAPI.getProfile()

// src/components/Profile.jsx
const response = await profileAPI.getProfile()
setProfile(response.data)
```

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Expected Response:**
```json
{
  "age": 24,
  "income": 250000,
  "caste": "OBC",
  "occupation": "Student",
  "state": "Madhya Pradesh",
  "name": "Pawan",
  "email": "pawan@test.com"
}
```

---

### 3. Scheme APIs

#### Create Scheme (Admin Only)

**Endpoint:** `POST /api/schemes`

**Frontend Implementation:**
```javascript
// src/services/api.js
schemeAPI.createScheme(schemeData)

// src/components/AddScheme.jsx
const schemeData = {
  name: '',
  description: '',
  minIncome: 0,
  maxIncome: 300000,
  caste: 'ALL',
  state: 'ALL',
  minAge: 18,
  maxAge: 30,
  occupation: 'Student'
}
await schemeAPI.createScheme(schemeData)
```

**Request Headers:**
```
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json
```

**Request Payload:**
```json
{
  "name": "Student Scholarship",
  "description": "Financial aid for students",
  "minIncome": 0,
  "maxIncome": 300000,
  "caste": "ALL",
  "state": "ALL",
  "minAge": 18,
  "maxAge": 30,
  "occupation": "Student"
}
```

**Expected Response:**
```json
{
  "id": 1,
  "name": "Student Scholarship",
  "description": "Financial aid for students",
  "minIncome": 0,
  "maxIncome": 300000,
  "caste": "ALL",
  "state": "ALL",
  "minAge": 18,
  "maxAge": 30,
  "occupation": "Student",
  "createdAt": "2024-04-29T10:00:00Z"
}
```

---

#### Get All Schemes

**Endpoint:** `GET /api/schemes`

**Frontend Implementation:**
```javascript
// src/services/api.js
schemeAPI.getAllSchemes()

// src/components/AllSchemes.jsx
const response = await schemeAPI.getAllSchemes()
setSchemes(response.data)
```

**Request Headers:**
```
No special headers required (public endpoint)
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "name": "Student Scholarship",
    "description": "Financial aid for students",
    "minIncome": 0,
    "maxIncome": 300000,
    "caste": "ALL",
    "state": "ALL",
    "minAge": 18,
    "maxAge": 30,
    "occupation": "Student"
  },
  {
    "id": 2,
    "name": "Teacher Incentive",
    "description": "Support for teachers",
    "minIncome": 100000,
    "maxIncome": 500000,
    "caste": "ALL",
    "state": "ALL",
    "minAge": 21,
    "maxAge": 65,
    "occupation": "Employed"
  }
]
```

---

#### Get Eligible Schemes

**Endpoint:** `GET /api/schemes/eligible`

**Frontend Implementation:**
```javascript
// src/services/api.js
schemeAPI.getEligibleSchemes()

// src/components/EligibleSchemes.jsx
const response = await schemeAPI.getEligibleSchemes()
setSchemes(response.data)
```

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "name": "Student Scholarship",
    "description": "Financial aid for students",
    "minIncome": 0,
    "maxIncome": 300000,
    "caste": "ALL",
    "state": "ALL",
    "minAge": 18,
    "maxAge": 30,
    "occupation": "Student"
  }
]
```

**Eligibility Criteria Matched:**
- User's income is within the scheme's income range
- User's age is within the scheme's age range
- User's caste matches the scheme's caste (or scheme accepts "ALL")
- User's state matches the scheme's state (or scheme accepts "ALL")
- User's occupation matches the scheme's occupation

---

## Authentication Flow

### Step 1: Registration
```
User fills form → Frontend → POST /api/auth/register → Backend → DB
```

### Step 2: Login
```
User enters credentials → Frontend → POST /api/auth/login → Backend
← JWT Token ← Frontend stores in localStorage
```

### Step 3: Authenticated Request
```
User makes request → Frontend adds token to header → Backend validates token
→ Processes request → Returns data
```

## Token Management

### How Tokens Are Used

**Storage:**
```javascript
// Login
const token = response.data
localStorage.setItem('token', token)

// AuthContext persists it
```

**Usage:**
```javascript
// In API interceptor
const token = localStorage.getItem('token')
config.headers.Authorization = `Bearer ${token}`
```

**Logout:**
```javascript
localStorage.removeItem('token')
```

## Error Handling

### API Errors

**Frontend:**
```javascript
try {
  const response = await apiClient.post('/endpoint', data)
  // Success
} catch (err) {
  // Backend returns error response
  const errorMsg = err.response?.data?.message || 'Unknown error'
  setError(errorMsg)
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

### Network Errors

```javascript
catch (err) {
  if (err.message === 'Network Error') {
    setError('Network error. Please check your connection.')
  }
}
```

## CORS Configuration

The frontend proxy (Vite config) handles CORS:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true
  }
}
```

This means:
- Frontend requests to `/api/*` are proxied to `http://localhost:8080/api/*`
- CORS headers are handled automatically
- No CORS errors in development

## Production Deployment

For production, you'll need to:

1. **Build the frontend:**
```bash
npm run build
```

2. **Update API base URL:**
Choose one option:

**Option A:** Use environment variables
```javascript
// vite.config.js
const API_URL = process.env.VITE_API_URL || 'http://localhost:8080'
```

**Option B:** Configure backend CORS headers

If deploying frontend and backend to different domains, ensure your backend is configured to accept CORS requests:

```yaml
# Application.properties
cors.allowed-origins=https://your-frontend-domain.com
```

## Testing the Integration

### Manual Testing Steps

1. **Register:**
   - Go to `/register`
   - Fill form and submit
   - Check browser Network tab for POST request to `/api/auth/register`

2. **Login:**
   - Go to `/login`
   - Check localStorage for token after login
   - DevTools → Application → Local Storage → token

3. **Profile:**
   - Go to `/profile`
   - Fill form and save
   - Check Network tab shows `Authorization: Bearer ...` header

4. **View Schemes:**
   - Go to `/all-schemes`
   - Verify data loads from `/api/schemes`

### Using Browser DevTools

**Network Tab:**
1. Open DevTools (F12)
2. Go to Network tab
3. Perform an action (login, submit form)
4. Click the request to see:
   - Request headers (Authorization)
   - Request body (payload)
   - Response (data or error)
   - Status code

## Troubleshooting

### "Cannot GET /api/auth/login"
- Backend is not running
- Wrong API base URL
- Check `vite.config.js` proxy configuration

### "401 Unauthorized"
- Token is missing or expired
- Token format is incorrect
- Check localStorage for token
- Try logging in again

### "CORS Error"
- Backend CORS not configured properly
- In development, use Vite proxy (already configured)
- In production, configure backend CORS headers

### "Network Error"
- Backend is down
- Check if backend is running: `curl http://localhost:8080`
- Check network connectivity

## Code Examples

### Making an API Call

```javascript
import { schemeAPI } from '../services/api'

// Component code
const fetchSchemes = async () => {
  try {
    setLoading(true)
    const response = await schemeAPI.getAllSchemes()
    setSchemes(response.data)
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to fetch')
  } finally {
    setLoading(false)
  }
}
```

### Using Authentication

```javascript
import { useAuth } from '../context/AuthContext'

const MyComponent = () => {
  const { token, login, logout, isAuthenticated } = useAuth()
  
  const handleLogin = async (email, password) => {
    try {
      const res = await authAPI.login(email, password)
      login(res.data) // Save token and user
      navigate('/dashboard')
    } catch (err) {
      setError('Login failed')
    }
  }
}
```

## API Workflow Diagram

```
┌──────────────────────────────────────────────────────────┐
│                    React Frontend                         │
│              (User Interface Components)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
                       ↓
        ┌──────────────────────────────┐
        │   Axios API Client           │
        │   (src/services/api.js)      │
        │                              │
        │  • Add Authorization header  │
        │  • Handle interceptors       │
        │  • Format requests/responses │
        └──────────────┬───────────────┘
                       │
                       ↓
        ┌──────────────────────────────┐
        │   Vite Dev Server Proxy      │
        │   (localhost:3000)           │
        │   Forwards to               │
        │   (localhost:8080)           │
        └──────────────┬───────────────┘
                       │
                       ↓
        ┌──────────────────────────────┐
        │   Spring Boot Backend API    │
        │   (Port 8080)                │
        │                              │
        │  • Validate JWT Token        │
        │  • Process Request           │
        │  • Query Database            │
        │  • Return Response           │
        └──────────────┬───────────────┘
                       │
                       ↓
        ┌──────────────────────────────┐
        │   MySQL Database             │
        │   (users, profiles, schemes) │
        └──────────────────────────────┘
```

---

For more details on specific features, see:
- [README.md](./README.md) - General setup and features
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
