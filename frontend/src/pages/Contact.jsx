import React from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from 'react-icons/fa';
import 'animate.css';

export default function Contact() {
  const black = '#111827';
  const gradient = 'linear-gradient(135deg, rgba(59,130,246,0.85), rgba(30,64,175,0.9))';

  const cardStyle = {
    backgroundImage: gradient,
    color: black,
    padding: '1.5rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    height: '100%',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        fontFamily: "'Poppins', sans-serif",
        backgroundImage: gradient,
        padding: '3rem 2rem',
      }}
    >
      <div className="w-100" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <section className="text-center mb-5 text-black">
          <h1 className="fw-bold mb-3">Contact Us</h1>
          <p className="lead">Have a question or need help? Reach out to us!</p>
        </section>

        {/* Contact Info */}
        <div className="row justify-content-center g-4">
          <div className="col-md-6 col-lg-4">
            <div style={cardStyle}>
              <h5 className="fw-semibold mb-3">
                <FaMapMarkerAlt className="me-2 text-white" />
                Our Address
              </h5>
              <p>
                123 HealthTech Avenue,<br />
                Rajshahi, Bangladesh
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div style={cardStyle}>
              <h5 className="fw-semibold mb-3">
                <FaPhoneAlt className="me-2 text-white" />
                Phone Number
              </h5>
              <p>
                +880 1828-348463<br />
                Mon – Fri, 10AM – 6PM
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div style={cardStyle}>
              <h5 className="fw-semibold mb-3">
                <FaEnvelope className="me-2 text-white" />
                Email Address
              </h5>
              <p>
                rifatphysicist1@gmail.com<br />
                support@heart-analyzer.com
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div style={cardStyle}>
              <h5 className="fw-semibold mb-3">
                <FaClock className="me-2 text-white" />
                Business Hours
              </h5>
              <p>
                Monday to Friday: 10:00 AM – 6:00 PM<br />
                Saturday & Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
