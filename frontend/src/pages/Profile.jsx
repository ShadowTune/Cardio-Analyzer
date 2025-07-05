import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [checkups, setCheckups] = useState([]);
  const [showDetailsId, setShowDetailsId] = useState(null);
  const [detailsData, setDetailsData] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parseInt(parsedUser.id) !== parseInt(id)) {
      alert("Unauthorized access");
      navigate('/');
      return;
    }

    setUser(parsedUser);

    fetch(`http://localhost:5600/api/history/${parsedUser.id}`, {
      headers: { 'Authorization': 'Bearer ' + parsedUser.token }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch checkups");
        return res.json();
      })
      .then(data => {
        const normalized = data.map(item => ({
          ...item,
          heart_condition: (item.heart_condition || item.result || 'unknown').toLowerCase()
        }));
        setCheckups(normalized);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        alert('Failed to load checkup history');
      });
  }, [id, navigate]);

  const loadCheckupDetails = async (checkupId) => {
    if (showDetailsId === checkupId) {
      setShowDetailsId(null);
      setDetailsData(null);
      setDetailsError(null);
      return;
    }

    setLoadingDetails(true);
    setDetailsError(null);

    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = storedUser?.token;

      const res = await fetch(`http://localhost:5600/api/checkup/${checkupId}`, {
        headers: { 'Authorization': 'Bearer ' + token }
      });

      if (!res.ok) throw new Error("Failed to fetch checkup details");

      const data = await res.json();

      setDetailsData(data);
      setShowDetailsId(checkupId);
    } catch (error) {
      console.error("Details fetch error:", error);
      setDetailsError("Could not load details.");
      setShowDetailsId(null);
      setDetailsData(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const deleteCheckup = async (checkupId) => {
    if (!window.confirm('Are you sure you want to delete this checkup?')) return;

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = storedUser?.token;

    try {
      const res = await fetch(`http://localhost:5600/api/checkup/${checkupId}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });

      if (res.ok) {
        setCheckups(prev => prev.filter(ch => ch.id !== checkupId));
        if (showDetailsId === checkupId) {
          setShowDetailsId(null);
          setDetailsData(null);
        }
      } else {
        alert('Failed to delete checkup');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error occurred while deleting');
    }
  };

  const getConditionStyle = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'normal': return { color: '#10b981', fontWeight: 'bold' };  // green
      case 'mild': return { color: '#f59e0b', fontWeight: 'bold' };    // amber
      case 'moderate': return { color: '#ea580c', fontWeight: 'bold' }; // orange
      case 'severe':
      case 'critical': return { color: '#ef4444', fontWeight: 'bold' }; // red
      default: return { color: 'gray', fontWeight: 'bold' };
    }
  };

  const textDark = '#111827';
  const bgInput = 'rgba(255, 255, 255, 0.15)';
  const gradient = 'linear-gradient(135deg, rgba(59,130,246,0.85), rgba(30,64,175,0.9))';

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-start py-5"
      style={{
        backgroundImage: gradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Poppins, sans-serif',
        color: textDark,
      }}
    >
      <div
        className="w-100 rounded-4 shadow-lg"
        style={{
          maxWidth: '960px',
          width: '90%',
          backgroundImage: gradient,
          padding: '30px',
          border: '1px solid white',
        }}
      >
        <h2 className="text-center fw-bold mb-4" style={{ color: textDark }}>Your Profile</h2>

        {user && (
          <div className="card border-0 shadow-sm mb-4 p-3" style={{ backgroundColor: bgInput }}>
            <div className="d-flex align-items-center gap-4">
              <img
                src={user.photo || '/default-avatar.png'}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-circle border border-dark"
              />
              <div>
                <h5 className="mb-1" style={{ color: textDark }}>{user.name}</h5>
                <p className="mb-2 text-dark">{user.email}</p>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => navigate(`/edit-profile/${user.id}`)}
                  style={{ color: 'black', borderColor: 'rgba(209, 213, 219, 0.5)' }}
                >
                  <FaEdit className="me-2" /> Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}

        <h4 className="mb-3" style={{ color: textDark }}>Checkup History</h4>

        {checkups.length === 0 ? (
          <p className="text-light">No checkups recorded yet.</p>
        ) : (
          <div
            className="table-responsive rounded-4 p-3"
            style={{
              backgroundImage: gradient,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
            }}
          >
            <table className="table align-middle mb-0" style={{ color: textDark }}>
              <thead style={{ backgroundColor: 'rgba(191, 219, 254, 0.2)' }}>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Details</th>
                  <th>Condition</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {checkups.map(ch => (
                  <tr
                    key={ch.id}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'background-color 0.3s ease',
                      cursor: 'default'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
                  >
                    <td>{new Date(ch.created_at).toLocaleDateString()}</td>
                    <td>{new Date(ch.created_at).toLocaleTimeString()}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => loadCheckupDetails(ch.id)}
                      >
                        <FaEye />
                      </button>
                    </td>
                    <td style={getConditionStyle(ch.heart_condition)}>
                      {ch.heart_condition
                        ? ch.heart_condition.charAt(0).toUpperCase() + ch.heart_condition.slice(1)
                        : 'Unknown'}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteCheckup(ch.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {loadingDetails && (
              <div className="alert alert-light mt-4" style={{ backgroundColor: 'rgba(255,255,255,0.8)', color: textDark }}>
                Loading details...
              </div>
            )}

            {detailsError && (
              <div className="alert alert-danger mt-4">
                {detailsError}
              </div>
            )}

            {showDetailsId && detailsData && (
              <div className="alert alert-light mt-4" style={{ backgroundColor: 'rgba(255,255,255,0.8)', color: textDark }}>
                <h5>Checkup Details</h5>
                <ul style={{ fontSize: '0.9rem' }}>
                  {detailsData.input_data && Object.entries(detailsData.input_data).map(([key, val]) => (
                    <li key={key}>
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {val !== null ? val.toString() : 'N/A'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}