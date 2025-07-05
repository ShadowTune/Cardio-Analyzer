import React from 'react';

export default function AboutUs() {
  const black = '#111827';
  const gradient = 'linear-gradient(135deg, rgba(59,130,246,0.85), rgba(30,64,175,0.9))';

  const sectionStyle = {
    backgroundImage: gradient,
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    marginBottom: '2rem',
    color: black,
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        fontFamily: "'Poppins', sans-serif",
        backgroundImage: gradient,
        padding: '3rem 2rem',
        color: black,
      }}
    >
      <div className="w-100" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <section style={sectionStyle}>
          <h1 className="mb-4 fw-bold">About Us</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Welcome to Heart Attack Risk Analyzer, your trusted partner in understanding and managing your cardiovascular health.
            Our mission is to empower individuals through accurate, AI-powered predictions combined with clear insights and preventive tips.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 className="mb-4 fw-semibold">Our Vision</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            To make heart disease risk assessment accessible, easy to understand, and actionable for everyone around the globe.
            We envision a future where early detection and prevention significantly reduce heart-related illnesses.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 className="mb-4 fw-semibold">Our Team</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Our team is a passionate group of healthcare professionals, data scientists, and developers dedicated to delivering reliable
            and user-friendly health technology solutions.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 className="mb-4 fw-semibold">Why Choose Us?</h2>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.6', paddingLeft: '1.25rem' }}>
            <li>AI-driven accurate heart attack risk prediction models.</li>
            <li>Strong commitment to data privacy and security.</li>
            <li>Easy-to-use interface designed for everyone.</li>
            <li>Continuous updates based on latest medical research.</li>
            <li>Helpful health tips and educational resources.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
