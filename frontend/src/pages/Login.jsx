import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  FaEnvelope, FaLock, FaEye, FaEyeSlash,
  FaHeart, FaUserPlus, FaUserSecret
} from 'react-icons/fa';
import 'animate.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.token) {
      navigate('/');
    }
  }, [navigate]);

  // Handle user login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5600/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store combined user and token object for easy retrieval
        localStorage.setItem("user", JSON.stringify({ ...data.user, token: data.token }));
        navigate(`/profile/${data.user.id}`);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  // Handle guest login
  const handleGuestLogin = async () => {
    try {
      const response = await fetch("http://localhost:5600/api/guest-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify({ ...data.user, token: data.token }));
        navigate(`/`);
      } else {
        alert(data.message || "Guest login failed");
      }
    } catch (error) {
      console.error("Guest login error:", error);
      alert("An error occurred during guest login.");
    }
  };

  const textSoft = '#111827';
  const borderSoft = 'rgba(209, 213, 219, 0.5)';
  const bgInput = 'rgba(255, 255, 255, 0.15)';

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: 'linear-gradient(135deg, rgba(59,130,246,0.85), rgba(30,64,175,0.9))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="row rounded-4 shadow-lg overflow-hidden animate__animated animate__fadeIn"
        style={{
          width: '60vw',
          height: '60vh',
          backgroundImage: 'linear-gradient(135deg, #3b82f6, #1e3a8a)',
          color: textSoft,
          padding: 0,
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <div
          className="col-md-6 d-none d-md-flex flex-column justify-content-center px-5"
          style={{ gap: '1rem' }}
        >
          <h1 className="fw-bold mb-4 d-flex align-items-center" style={{ color: textSoft }}>
            <FaHeart className="me-3" /> Heart Analyzer
          </h1>
          <p className="fs-6 mb-1">🩺 Predict heart attack risks accurately.</p>
          <p className="fs-6 mb-1">🔐 100% data privacy guaranteed.</p>
          <p className="fs-6 mb-1">⚡ Super easy, fast, and user-friendly.</p>
          <p className="fs-6 mb-4">📊 View insights and get prevention tips.</p>
          <p className="fs-7 text-black-100 opacity-100">Your health journey starts here.</p>
        </div>

        <div
          className="col-md-6 p-4"
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: bgInput }}
        >
          <h2 className="text-center fw-bold mb-4" style={{ color: textSoft }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text" style={{ backgroundColor: bgInput, color: textSoft, borderColor: borderSoft }}>
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ backgroundColor: bgInput, color: textSoft, borderColor: borderSoft }}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" style={{ backgroundColor: bgInput, color: textSoft, borderColor: borderSoft }}>
                <FaLock />
              </span>
              <input
                type={showPass ? 'text' : 'password'}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ backgroundColor: bgInput, color: textSoft, borderColor: borderSoft }}
              />
              <span
                className="input-group-text"
                role="button"
                onClick={() => setShowPass(!showPass)}
                style={{ backgroundColor: bgInput, color: textSoft, borderColor: borderSoft }}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  id="rememberMe"
                  style={{ accentColor: textSoft }}
                />
                <label className="form-check-label" htmlFor="rememberMe" style={{ color: textSoft }}>
                  Remember me
                </label>
              </div>
              <button type="button" className="btn btn-link p-0" style={{ color: textSoft, textDecoration: 'underline' }}>
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="btn w-100 fw-bold mb-3"
              style={{ backgroundColor: 'rgba(255 255 255 / 0.25)', border: 'none', color: textSoft }}
            >
              Sign in to Dashboard
            </button>

            <div className="text-center small mb-2" style={{ color: textSoft }}>
              Don't have an account?
            </div>
            <button
              type="button"
              className="btn w-100 fw-bold mb-3 d-flex justify-content-center align-items-center"
              onClick={() => navigate('/register')}
              style={{ borderColor: borderSoft, color: textSoft, backgroundColor: 'transparent' }}
            >
              <FaUserPlus className="me-2" /> Create Account
            </button>

            <div className="text-center small mb-2" style={{ color: textSoft }}>
              Just exploring?
            </div>
            <button
              type="button"
              className="btn w-100 fw-bold d-flex justify-content-center align-items-center"
              onClick={handleGuestLogin}
              style={{ borderColor: borderSoft, color: textSoft, backgroundColor: 'transparent' }}
            >
              <FaUserSecret className="me-2" /> Continue as Guest
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
