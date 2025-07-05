import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import Register from './pages/Register';
import Predict from './pages/Predict';
import Statistics from './pages/Statistics';
import Prevention from './pages/Prevention';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Navbar from './components/Navbar';

import './App.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

// Simple PrivateRoute wrapper to protect routes
function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/prevention" element={<Prevention />} />
        <Route path="/statistics" element={<Statistics />} />

        {/* Guest Predict route (optional) */}
        <Route path="/predict/guest" element={<Predict />} />

        {/* Protected Routes */}
        <Route
          path="/predict/:id"
          element={
            <PrivateRoute>
              <Predict />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile/:id"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />

        {/* Catch all - redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
