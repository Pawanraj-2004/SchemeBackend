import React, { useState, useEffect } from 'react'
import { profileAPI } from '../services/api'
import '../styles/Profile.css'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    caste: '',
    occupation: '',
    state: ''
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await profileAPI.getProfile()
      setProfile(response.data)
      setFormData({
        age: response.data.age || '',
        income: response.data.income || '',
        caste: response.data.caste || '',
        occupation: response.data.occupation || '',
        state: response.data.state || ''
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      const response = await profileAPI.createProfile(formData)
      setProfile(response.data)
      setSuccessMessage('Profile created/updated successfully!')
      setIsEditing(false)
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !profile) {
    return <div className="loading">Loading profile...</div>
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {profile && !isEditing && (
        <div className="profile-view">
          <div className="profile-info">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Age:</strong> {profile.age}</p>
            <p><strong>Income:</strong> ₹{profile.income}</p>
            <p><strong>Caste:</strong> {profile.caste}</p>
            <p><strong>Occupation:</strong> {profile.occupation}</p>
            <p><strong>State:</strong> {profile.state}</p>
          </div>
          <button onClick={() => setIsEditing(true)} className="btn-edit">
            Edit Profile
          </button>
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Annual Income (₹):</label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Caste:</label>
            <select name="caste" value={formData.caste} onChange={handleChange} required>
              <option value="">Select Caste</option>
              <option value="GENERAL">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="ALL">All</option>
            </select>
          </div>

          <div className="form-group">
            <label>Occupation:</label>
            <select name="occupation" value={formData.occupation} onChange={handleChange} required>
              <option value="">Select Occupation</option>
              <option value="Student">Student</option>
              <option value="Employed">Employed</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Farmer">Farmer</option>
            </select>
          </div>

          <div className="form-group">
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="e.g., Madhya Pradesh"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false)
                if (profile) {
                  setFormData({
                    age: profile.age || '',
                    income: profile.income || '',
                    caste: profile.caste || '',
                    occupation: profile.occupation || '',
                    state: profile.state || ''
                  })
                }
              }}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Profile
