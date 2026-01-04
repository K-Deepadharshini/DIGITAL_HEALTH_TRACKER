// frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Emergency from "./pages/Emergency";
import HealthProfile from "./pages/HealthProfile";
import FormPage from "./pages/FormPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const serverIP = process.env.REACT_APP_SERVER_IP || "localhost";
      const serverPort = process.env.REACT_APP_SERVER_PORT || "5000";
      
      const response = await fetch(`http://${serverIP}:${serverPort}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.data.user);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <span className="logo-icon">🩵</span>
          HealthTracker
        </div>

        {isAuthenticated ? (
          <>
            <ul className="navbar-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/emergency">Emergency</Link></li>
            </ul>

            <div className="navbar-actions">
              <span className="welcome-text">Welcome, {user?.fullName || "User"}</span>
              <button className="btn-primary" onClick={handleSignOut}>Sign Out</button>
            </div>
          </>
        ) : (
          <div className="navbar-actions">
            <Link to="/login">
              <button className="btn-secondary">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn-primary">Sign Up</button>
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Login />} 
          />
          <Route 
            path="/emergency" 
            element={isAuthenticated ? <Emergency /> : <Login />} 
          />
          <Route 
            path="/health" 
            element={isAuthenticated ? <HealthProfile /> : <Login />} 
          />
          <Route 
            path="/form" 
            element={isAuthenticated ? <FormPage /> : <Login />} 
          />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Digital Health Tracker</p>
      </footer>
    </div>
  );
}

export default App;