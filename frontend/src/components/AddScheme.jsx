import React, { useState } from 'react'
import { schemeAPI } from '../services/api'
import '../styles/Schemes.css'

const AddScheme = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    minIncome: '',
    maxIncome: '',
    caste: 'ALL',
    state: 'ALL',
    minAge: '',
    maxAge: '',
    occupation: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

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
      const schemeData = {
        ...formData,
        minIncome: parseInt(formData.minIncome),
        maxIncome: parseInt(formData.maxIncome),
        minAge: parseInt(formData.minAge),
        maxAge: parseInt(formData.maxAge)
      }

      await schemeAPI.createScheme(schemeData)
      setSuccessMessage('Scheme created successfully!')
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        minIncome: '',
        maxIncome: '',
        caste: 'ALL',
        state: 'ALL',
        minAge: '',
        maxAge: '',
        occupation: ''
      })
      
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create scheme')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-scheme-container">
      <h2>Add New Scheme</h2>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="scheme-form">
        <div className="form-row">
          <div className="form-group">
            <label>Scheme Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Minimum Income (₹):</label>
            <input
              type="number"
              name="minIncome"
              value={formData.minIncome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Maximum Income (₹):</label>
            <input
              type="number"
              name="maxIncome"
              value={formData.maxIncome}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Minimum Age:</label>
            <input
              type="number"
              name="minAge"
              value={formData.minAge}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Maximum Age:</label>
            <input
              type="number"
              name="maxAge"
              value={formData.maxAge}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Caste Category:</label>
            <select name="caste" value={formData.caste} onChange={handleChange} required>
              <option value="GENERAL">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="ALL">All</option>
            </select>
          </div>

          <div className="form-group">
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="e.g., Madhya Pradesh or ALL"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Occupation:</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="e.g., Student"
              required
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? 'Creating Scheme...' : 'Create Scheme'}
        </button>
      </form>
    </div>
  )
}

export default AddScheme
