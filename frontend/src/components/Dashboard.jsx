import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Scheme Management System</h1>
          <div className="user-menu">
            <span className="user-name">Welcome!</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button onClick={() => navigate('/profile')} className="nav-item">Profile</button>
        <button onClick={() => navigate('/eligible-schemes')} className="nav-item">My Eligibility</button>
        <button onClick={() => navigate('/all-schemes')} className="nav-item">All Schemes</button>
        <button onClick={() => navigate('/add-scheme')} className="nav-item">Add Scheme (Admin)</button>
      </nav>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Welcome to the Scheme Management System</h2>
          <p>Use the navigation above to:</p>
          <ul>
            <li>Complete or update your <strong>Profile</strong></li>
            <li>View schemes you're <strong>Eligible For</strong></li>
            <li>Browse <strong>All Available Schemes</strong></li>
            <li>Add new schemes (Admin only)</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
