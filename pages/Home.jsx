import React from "react";
import { Link } from "react-router-dom";
import "./../styles/App.css"; // import your styles

const Home = () => {
  return (
    <div className="home-container">
      {/* Top Section */}
      <header className="hero-section">
        <h1 className="hero-title">Your Health, One Place, Anytime.</h1>
        <p className="hero-subtitle">
          Stay prepared. Stay safe. Stay connected.
        </p>
        <p className="hero-description">
          A secure digital platform to store, manage, and share your complete
          health information. From medical records to emergency QR codes, keep
          your health data organized and accessible when it matters most.
        </p>

        <div className="hero-buttons">
          <Link to="/health">
            <button className="btn-primary">Start Your Health Journey</button>
          </Link>
          <Link to="/about">
            <button className="btn-secondary">Learn More</button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Home;
