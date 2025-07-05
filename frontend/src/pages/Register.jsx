import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import 'animate.css';

export default function Register() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const staticRoles = [
      { id: 3, name: 'Moderator' },
      { id: 4, name: 'Salesman' },
      { id: 5, name: 'Technician' },
      { id: 1, name: 'User' }
    ];
    setRoles(staticRoles);
    setSelectedRole(staticRoles.find(r => r.name === 'User')?.id || '');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!(name && email && password && selectedRole)) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      localStorage.clear(); // Clear previous sessions

      const response = await fetch('http://localhost:5600/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role_id: parseInt(selectedRole),
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to register');
      }

      const data = await response.json();

      // Store user with token for consistency
      localStorage.setItem('user', JSON.stringify({ ...data.user, token: data.token }));

      navigate(`/profile/${data.user.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  const textSoft = '#374151'; // deeper gray-700
  const borderSoft = 'rgba(55, 65, 81, 0.5)';
  const bgInput = 'rgba(255, 255, 255, 0.15)';

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage:
          'linear-gradient(135deg, rgba(59,130,246,0.85), rgba(30,64,175,0.9))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="row rounded-4 shadow-lg overflow-hidden animate__animated animate__fadeIn"
        style={{
          width: '60vw',
          height: '60vh',
          color: textSoft,
          padding: 0,
        }}
      >
        {/* Left Side - Welcome Panel */}
        <div
          className="col-md-6 d-none d-md-flex flex-column justify-content-center px-5"
          style={{
            backgroundImage: 'linear-gradient(135deg, #3b82f6, #1e3a8a)',
            gap: '1rem',
            fontWeight: 600,
          }}
        >
          <h1
            className="fw-bold mb-4 d-flex align-items-center"
            style={{ color: textSoft, fontWeight: 700 }}
          >
            <FaUser className="me-3" /> Welcome to Heart Analyzer
          </h1>
          <p className="fs-6 mb-1" style={{ color: textSoft, fontWeight: 600 }}>
            🩺 Register to get personalized heart attack risk assessments.
          </p>
          <p className="fs-6 mb-1" style={{ color: textSoft, fontWeight: 600 }}>
            🔐 Your data is safe and secure with us.
          </p>
          <p className="fs-6 mb-1" style={{ color: textSoft, fontWeight: 600 }}>
            ⚡ Fast, easy, and reliable health insights.
          </p>
          <p className="fs-6 mb-4" style={{ color: textSoft, fontWeight: 600 }}>
            📊 Start your journey toward a healthier heart today.
          </p>
          <p className="fs-7 text-black-100 opacity-100">Join our community and stay informed.</p>
        </div>

        {/* Right Side - Register Form */}
        <div
          className="col-md-6 p-4 d-flex flex-column justify-content-center"
          style={{
            backgroundColor: bgInput,
            color: textSoft,
            fontWeight: 600,
          }}
        >
          <h2 className="text-center fw-bold mb-4" style={{ color: textSoft, fontWeight: 700 }}>
            Register
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {/* Role Dropdown */}
            <div className="input-group">
              <label
                htmlFor="roleSelect"
                className="input-group-text"
                style={{ backgroundColor: bgInput, color: textSoft, borderColor: borderSoft }}
              >
                Role
              </label>
              <select
                id="roleSelect"
                className="form-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                required
                style={{
                  backgroundColor: bgInput,
                  color: textSoft,
                  borderColor: borderSoft,
                  fontWeight: 600,
                }}
              >
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))
                ) : (
                  <option>Loading roles...</option>
                )}
              </select>
            </div>

            {/* Name Input */}
            <div className="input-group">
              <span
                className="input-group-text"
                style={{ backgroundColor: bgInput, color: textSoft, borderColor: borderSoft }}
              >
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  backgroundColor: bgInput,
                  color: textSoft,
                  borderColor: borderSoft,
                  caretColor: textSoft,
                  fontWeight: 600,
                }}
              />
            </div>

            {/* Email Input */}
            <div className="input-group">
              <span
                className="input-group-text"
                style={{ backgroundColor: bgInput, color: textSoft, borderColor: borderSoft }}
              >
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  backgroundColor: bgInput,
                  color: textSoft,
                  borderColor: borderSoft,
                  caretColor: textSoft,
                  fontWeight: 600,
                }}
              />
            </div>

            {/* Password Input with toggle */}
            <div className="input-group">
              <span
                className="input-group-text"
                style={{ backgroundColor: bgInput, color: textSoft, borderColor: borderSoft }}
              >
                <FaLock />
              </span>
              <input
                type={showPass ? 'text' : 'password'}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  backgroundColor: bgInput,
                  color: textSoft,
                  borderColor: borderSoft,
                  caretColor: textSoft,
                  fontWeight: 600,
                }}
              />
              <span
                className="input-group-text"
                role="button"
                onClick={() => setShowPass(!showPass)}
                style={{ backgroundColor: bgInput, color: textSoft, borderColor: borderSoft, cursor: 'pointer' }}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              className="btn fw-bold"
              style={{
                backgroundColor: 'rgba(255 255 255 / 0.25)',
                border: 'none',
                color: textSoft,
                transition: 'background-color 0.3s ease',
                marginTop: '1rem',
                fontWeight: 700,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(255 255 255 / 0.4)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(255 255 255 / 0.25)')
              }
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4" style={{ color: textSoft, fontWeight: 600 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#bfdbfe', textDecoration: 'underline' }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
