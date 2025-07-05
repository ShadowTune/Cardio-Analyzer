import React from 'react';
import {
  FaRunning, FaAppleAlt, FaSmokingBan, FaHeartbeat,
  FaWeight, FaTint, FaBriefcaseMedical, FaBed,
  FaSmileBeam, FaBiking, FaLungs, FaWalking
} from 'react-icons/fa';
import 'animate.css';

export default function Prevention() {
  const black = '#111827';

  const leftColumn = [
    {
      icon: <FaRunning className="text-danger me-2" />,
      text: 'Exercise regularly to strengthen your heart and improve circulation.',
    },
    {
      icon: <FaAppleAlt className="text-success me-2" />,
      text: 'Eat a heart-healthy diet rich in fruits, vegetables, and whole grains.',
    },
    {
      icon: <FaSmokingBan className="text-dark me-2" />,
      text: 'Avoid smoking and exposure to secondhand smoke.',
    },
    {
      icon: <FaHeartbeat className="text-primary me-2" />,
      text: 'Monitor blood pressure and cholesterol levels regularly.',
    },
    {
      icon: <FaWeight className="text-warning me-2" />,
      text: 'Maintain a healthy weight to reduce the risk of heart disease.',
    },
    {
      icon: <FaTint className="text-info me-2" />,
      text: 'Limit salt intake to help control blood pressure.',
    },
  ];

  const rightColumn = [
    {
      icon: <FaBriefcaseMedical className="text-danger me-2" />,
      text: 'Take prescribed medications regularly as directed by your doctor.',
    },
    {
      icon: <FaBed className="text-primary me-2" />,
      text: 'Ensure 7–8 hours of quality sleep each night to support heart health.',
    },
    {
      icon: <FaSmileBeam className="text-success me-2" />,
      text: 'Manage stress through relaxation techniques like meditation or hobbies.',
    },
    {
      icon: <FaBiking className="text-warning me-2" />,
      text: 'Include cycling or walking in your daily routine.',
    },
    {
      icon: <FaLungs className="text-dark me-2" />,
      text: 'Practice deep breathing exercises to support oxygen flow and reduce tension.',
    },
    {
      icon: <FaWalking className="text-info me-2" />,
      text: 'Avoid prolonged sitting—stand and stretch every hour.',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem 1rem',
        fontFamily: "'Poppins', sans-serif",
        background: 'linear-gradient(135deg, #a5b4fc, #3b82f6, #1e3a8a)',
        backgroundAttachment: 'fixed',
        color: black,
      }}
    >
      <div className="container">
        {/* Top Section */}
        <div className="text-center mb-5 text-white">
          <img
            src="frontend/src/assets/prevention.png"
            alt="Prevention"
            style={{ width: '250px', marginBottom: '1rem' }}
          />
          <h2 className="fw-bold">Heart Attack Prevention Tips</h2>
          <p className="fs-6">
            Small daily actions can help you reduce the risk of heart attack significantly.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="row g-4">
          <div className="col-md-6">
            {leftColumn.map((tip) => (
              <div
                className="d-flex align-items-center gap-2 p-3 mb-3 rounded-3 shadow-sm"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '0.85rem',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              >
                <div className="fs-5">{tip.icon}</div>
                <div className="flex-grow-1">{tip.text}</div>
              </div>
            ))}
          </div>

          <div className="col-md-6">
            {rightColumn.map((tip) => (
              <div
                className="d-flex align-items-center gap-2 p-3 mb-3 rounded-3 shadow-sm"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '0.85rem',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              >
                <div className="fs-5">{tip.icon}</div>
                <div className="flex-grow-1">{tip.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
