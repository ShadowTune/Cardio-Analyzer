import React from 'react';
import {
  FaMicroscope,
  FaChartBar,
  FaHeartbeat,
  FaShieldAlt,
  FaUserCheck,
  FaMobileAlt,
} from 'react-icons/fa';
import 'animate.css';

export default function Services() {
  const black = '#111827';
  const gradient = 'linear-gradient(135deg, rgba(59,130,246,0.85), rgba(30,64,175,0.9))';

  const services = [
  {
    icon: <FaMicroscope size={28} />,
    title: 'AI-Based Risk Prediction',
    desc: 'Our advanced machine learning models analyze your health data to estimate your heart attack risk with high accuracy.',
  },
  {
    icon: <FaChartBar size={28} />,
    title: 'Interactive Dashboard',
    desc: 'View risk levels, track progress over time, and monitor key health indicators in one place.',
  },
  {
    icon: <FaHeartbeat size={28} />,
    title: 'Real-Time Assessment',
    desc: 'Get instant results based on your submitted data without long waiting times.',
  },
  {
    icon: <FaShieldAlt size={28} />,
    title: 'Privacy & Security',
    desc: 'Your data is encrypted and never shared. We adhere to strict data protection standards.',
  },
  {
    icon: <FaUserCheck size={28} />,
    title: 'Guest Access',
    desc: 'Not ready to register? Use our tool in guest mode with limited but effective access.',
  },
  {
    icon: <FaMobileAlt size={28} />,
    title: 'Mobile Friendly',
    desc: 'Optimized experience across devices so you can check your health from anywhere.',
  },
];


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
        {/* Page Header */}
        <section className="text-center mb-5 text-black">
          <h1 className="fw-bold mb-3">Our Services</h1>
          <p className="lead">Empowering you with technology-driven health insights</p>
        </section>

        {/* Services Grid */}
        <div className="row g-4">
          {services.map((service, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div
                className="p-4 rounded-4 h-100 shadow-sm"
                style={{
                  backgroundImage: gradient,
                  color: black,
                  transition: 'transform 0.3s ease',
                }}
              >
                <div
                  className="mb-3 d-flex justify-content-center align-items-center bg-white rounded-circle"
                  style={{ width: 50, height: 50 }}
                >
                  {service.icon}
                </div>
                <h5 className="fw-semibold">{service.title}</h5>
                <p className="small">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
