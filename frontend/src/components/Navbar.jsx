import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    setUser(stored ? JSON.parse(stored) : null);
  }, [location.pathname]); // Refresh on route change (handles login/logout switch)

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold text-danger" to="/">
          Heart Analyzer
        </Link>
        <div className="collapse navbar-collapse show" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/services">Services</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
            {/* <li className="nav-item"><NavLink className="nav-link" to={`/predict/${user.id}`}>Predict</NavLink></li> */}
            <li className="nav-item"><NavLink className="nav-link" to="/statistics">Statistics</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/prevention">Prevention</NavLink></li>
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/predict/${user.id}`}>Predict</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/profile/${user.id}`}>Profile</NavLink>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
