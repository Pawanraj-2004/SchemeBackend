import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import AllSchemes from './components/AllSchemes'
import EligibleSchemes from './components/EligibleSchemes'
import AddScheme from './components/AddScheme'
import './App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/eligible-schemes"
            element={
              <PrivateRoute>
                <EligibleSchemes />
              </PrivateRoute>
            }
          />
          <Route
            path="/all-schemes"
            element={
              <PrivateRoute>
                <AllSchemes />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-scheme"
            element={
              <PrivateRoute>
                <AddScheme />
              </PrivateRoute>
            }
          />
          
          {/* Redirect to dashboard on root */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Catch all - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
