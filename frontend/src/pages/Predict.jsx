import React, { useState } from 'react';
import {
  FaHeartbeat, FaChartLine, FaLock, FaUserShield
} from 'react-icons/fa';
import 'animate.css';

export default function Predict() {
  const [formData, setFormData] = useState({
    age: '', sex: '0', cp: '0', trestbps: '', chol: '',
    fbs: '0', restecg: '0', thalach: '', exang: '0',
    oldpeak: '', slope: '0', ca: '0', thal: '0'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const black = '#111827';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'Normal': return 'success';
      case 'Mild': return 'info';
      case 'Moderate': return 'warning';
      case 'Critical': return 'danger';
      default: return 'secondary';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, isNaN(v) ? v : Number(v)])
      );

      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id || 'guest';

      const response = await fetch(`http://localhost:5000/api/predict/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.risk_level !== undefined) {
        setResult(data);
      } else {
        throw new Error(data.error || 'Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Prediction failed. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const featureBoxes = [
    {
      icon: <FaHeartbeat size={24} className="text-danger me-2" />,
      title: 'AI-Powered Predictions',
      description: 'Uses machine learning to assess heart risk accurately.'
    },
    {
      icon: <FaChartLine size={24} className="text-primary me-2" />,
      title: 'Health Trend Analysis',
      description: 'Track and visualize vital indicators over time.'
    },
    {
      icon: <FaUserShield size={24} className="text-success me-2" />,
      title: 'Guest Mode Access',
      description: 'Run predictions without logging in.'
    },
    {
      icon: <FaLock size={24} className="text-dark me-2" />,
      title: 'Secure Data Handling',
      description: 'Your health data is handled with privacy.'
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        fontFamily: "'Poppins', sans-serif",
        background: 'linear-gradient(135deg, #a5b4fc, #3b82f6, #1e3a8a)',
        backgroundAttachment: 'fixed',
        padding: '3rem 1rem',
        color: black,
      }}
    >
      <div className="container">

        {/* Header */}
        <div className="p-4 mb-5 rounded-4 shadow-lg animate__animated animate__fadeInDown text-center"
          style={{
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}>
          <img
            src="/src/assets/heart.jpg"
            alt="Heart"
            style={{ width: '250px', marginBottom: '1rem' }}
          />
          <h2 className="fw-bold">Welcome to Heart Analyzer</h2>
          <p className="mt-2">Your assistant for predicting heart attack risk.</p>
        </div>

        {/* Features */}
        <div className="row g-4 mb-5">
          {featureBoxes.map((feature, idx) => (
            <div key={idx} className="col-md-6 animate__animated animate__fadeInUp">
              <div className="p-4 rounded-4 shadow-lg h-100"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}>
                <div className="d-flex align-items-center mb-2">
                  {feature.icon}
                  <h5 className="fw-bold mb-0">{feature.title}</h5>
                </div>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Prediction Form */}
        <div className="p-4 rounded-4 shadow-lg animate__animated animate__fadeInUp"
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}>
          <h3 className="fw-bold text-center mb-4">Heart Risk Prediction</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Numeric Inputs */}
              <div className="col-md-6">
                {[
                  { label: 'Age', name: 'age' },
                  { label: 'Resting BP (trestbps)', name: 'trestbps' },
                  { label: 'Cholesterol (chol)', name: 'chol' },
                  { label: 'Max Heart Rate (thalach)', name: 'thalach' },
                  { label: 'Oldpeak (ST depression)', name: 'oldpeak' },
                  { label: 'Major Vessels (ca)', name: 'ca' },
                ].map((field, i) => (
                  <div className="mb-3" key={i}>
                    <label className="form-label fw-semibold">{field.label}</label>
                    <input
                      type="number"
                      className="form-control"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Select Inputs */}
              <div className="col-md-6">
                {[
                  { label: 'Sex', name: 'sex', options: ['Female', 'Male'] },
                  { label: 'Chest Pain Type', name: 'cp', options: ['Typical Angina', 'Atypical Angina', 'Non-anginal', 'Asymptomatic'] },
                  { label: 'Fasting Blood Sugar > 120', name: 'fbs', options: ['No', 'Yes'] },
                  { label: 'Resting ECG', name: 'restecg', options: ['Normal', 'Abnormality', 'LV Hypertrophy'] },
                  { label: 'Exercise Induced Angina', name: 'exang', options: ['No', 'Yes'] },
                  { label: 'Slope of ST Segment', name: 'slope', options: ['Upsloping', 'Flat', 'Downsloping'] },
                  { label: 'Thalassemia', name: 'thal', options: ['Normal', 'Fixed Defect', 'Reversible Defect'] }
                ].map((field, i) => (
                  <div className="mb-3" key={i}>
                    <label className="form-label fw-semibold">{field.label}</label>
                    <select
                      className="form-select"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                    >
                      {field.options.map((opt, idx) => (
                        <option key={idx} value={idx}>{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-dark w-100 fw-bold mt-3" disabled={loading}>
              {loading ? 'Predicting...' : 'Predict Now'}
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {result && (
              <div className={`alert alert-${getRiskColor(result.risk_level)} mt-4 text-center`}>
                <h5 className="fw-bold">Prediction Result</h5>
                <p><strong>Risk Level:</strong> {result.risk_level}</p>
                <p><strong>Model Confidence:</strong> {result.confidence}</p>
                <p><strong>Probability (Presence):</strong> {result.probability_presence}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
