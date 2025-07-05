import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft, FaEye, FaEyeSlash, FaPen } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    photo: '',
    password: '',
    confirmPassword: ''
  });

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPen, setShowPen] = useState(false);

  const textDark = '#111827';
  const borderSoft = 'rgba(209, 213, 219, 0.5)';
  const bgInput = 'rgba(255, 255, 255, 0.15)';
  const gradient = 'linear-gradient(135deg, rgba(59,130,246,0.85), rgba(30,64,175,0.9))';

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) return navigate('/login');

    // Optional: Prevent guest users from editing
    if (storedUser.id === 'guest') {
      alert('Guest users cannot update profile.');
      return navigate('/');
    }

    setUserId(storedUser.id);
    setForm({
      name: storedUser.name,
      email: storedUser.email,
      photo: storedUser.photo || '',
      password: '',
      confirmPassword: ''
    });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    setLoading(true);
    const updatedUser = { ...form };
    if (!updatedUser.password) delete updatedUser.password;
    delete updatedUser.confirmPassword;

    try {
      const res = await fetch(`http://localhost:5600/api/edit-profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Profile updated!');
        navigate(`/profile/${userId}`);
      } else {
        alert(data.message || 'Failed to update');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: gradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <div
        className="rounded-4 shadow-lg p-5"
        style={{
          width: '90%',
          maxWidth: '600px',
          backgroundImage: gradient,
          color: textDark
        }}
      >
        <h2 className="text-center fw-bold mb-4">Edit Profile</h2>

        {/* Profile Photo Section */}
        <div className="text-center mb-4" style={{ margin: '0 auto' }}>
          <div
            className="position-relative"
            style={{ width: 120, height: 120, margin: '0 auto', cursor: 'pointer' }}
            onClick={handlePhotoClick}
            onMouseEnter={() => setShowPen(true)}
            onMouseLeave={() => setShowPen(false)}
          >
            <img
              src={form.photo || '/frontend/src/assets/profile.png'}
              alt="Profile"
              className="rounded-circle border border-dark"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: '0.3s ease',
                filter: showPen ? 'brightness(0.7)' : 'none'
              }}
            />
            {showPen && (
              <FaPen
                className="position-absolute top-50 start-50 translate-middle bg-white text-dark rounded-circle p-2 shadow"
                style={{ fontSize: 20 }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="d-none"
              onChange={handlePhotoChange}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
              style={{ backgroundColor: bgInput, color: textDark, borderColor: borderSoft }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
              style={{ backgroundColor: bgInput, color: textDark, borderColor: borderSoft }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <div className="input-group">
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                style={{ backgroundColor: bgInput, color: textDark, borderColor: borderSoft }}
              />
              <span className="input-group-text" onClick={() => setShowPass(!showPass)} role="button">
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                className="form-control"
                value={form.confirmPassword}
                onChange={handleChange}
                style={{ backgroundColor: bgInput, color: textDark, borderColor: borderSoft }}
              />
              <span className="input-group-text" onClick={() => setShowConfirm(!showConfirm)} role="button">
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => navigate('/profile')}
              disabled={loading}
            >
              <FaArrowLeft className="me-2" /> Cancel
            </button>

            <button
              type="submit"
              className="btn btn-dark"
              disabled={loading}
            >
              <FaSave className="me-2" /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}