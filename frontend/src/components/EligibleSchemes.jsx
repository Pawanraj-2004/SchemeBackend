import React, { useState, useEffect } from 'react'
import { schemeAPI } from '../services/api'
import '../styles/Schemes.css'

const EligibleSchemes = () => {
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEligibleSchemes()
  }, [])

  const fetchEligibleSchemes = async () => {
    try {
      setLoading(true)
      const response = await schemeAPI.getEligibleSchemes()
      setSchemes(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch eligible schemes')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading eligible schemes...</div>
  }

  return (
    <div className="schemes-container">
      <h2>Schemes You're Eligible For</h2>
      {error && <div className="error-message">{error}</div>}
      
      {schemes.length === 0 ? (
        <p className="no-schemes">No eligible schemes found. Please complete your profile.</p>
      ) : (
        <div className="schemes-grid">
          {schemes.map(scheme => (
            <div key={scheme.id} className="scheme-card eligible">
              <div className="eligible-badge">✓ Eligible</div>
              <h3>{scheme.name}</h3>
              <p className="description">{scheme.description}</p>
              <div className="scheme-details">
                <div className="detail">
                  <span className="label">Income Range:</span>
                  <span>₹{scheme.minIncome} - ₹{scheme.maxIncome}</span>
                </div>
                <div className="detail">
                  <span className="label">Age Range:</span>
                  <span>{scheme.minAge} - {scheme.maxAge} years</span>
                </div>
                <div className="detail">
                  <span className="label">Caste:</span>
                  <span>{scheme.caste}</span>
                </div>
                <div className="detail">
                  <span className="label">State:</span>
                  <span>{scheme.state}</span>
                </div>
                <div className="detail">
                  <span className="label">Occupation:</span>
                  <span>{scheme.occupation}</span>
                </div>
              </div>
              <button className="btn-apply">Apply Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EligibleSchemes
