import React from "react";
import { Link } from "react-router-dom";
import "./../styles/App.css"; // optional styling import

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <span className="logo-icon">💙</span>
        <h2>HealthTracker</h2>
      </div>

      {/* Menu Links */}
      <ul className="navbar-links">
         <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/dashboard">Features</Link></li>
        <li><Link to="/emergency">Contact</Link></li>
      </ul>

      {/* Get Started Button */}
      <div>
        <Link to="/dashboard">
          <button className="btn-primary">Get Started</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
