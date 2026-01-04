import React from "react";
import { Link } from "react-router-dom"; // ✅ for navigation
import "./../styles/App.css";

const HealthProfile = () => {
  return (
    <div className="health-wrapper">
      {/* Hero Section */}
      <section className="health-hero">
        <h1 className="health-title">
          Set Up Your Digital Health Profile in Minutes
        </h1>
        <p className="health-subtext">
          Follow our simple 3-step process to create your secure health profile
          and start managing your medical information like never before.
        </p>

        <div className="health-badges">
          {/* Upload Page Button */}
          <Link to="/form" className="upload-btn">
            Upload Your Health Record
          </Link>
        </div>
      </section>

      {/* 3-Step Setup */}
      <section className="health-steps">
        <h2 className="section-title">Simple 3-Step Setup</h2>
        <div className="steps-grid">
          {[
            {
              title: "Upload Health Records",
              desc: "Add your existing medical records, prescriptions, and vaccination cards. Our smart upload system ensures compatibility.",
              items: [
                "Medical documents",
                "Prescriptions",
                "Vaccination records",
              ],
            },
            {
              title: "Generate Emergency QR",
              desc: "Create your personalized emergency QR code with critical health details. Print wallet cards or share digitally.",
              items: [
                "Critical info detection",
                "Share with doctors",
                "Offline access",
              ],
            },
            {
              title: "Set Up Reminders",
              desc: "Configure smart reminders for medications, appointments, and routine checkups. Never miss an important task again.",
              items: [
                "Medication alerts",
                "Appointment reminders",
                "Health checkup reminders",
              ],
            },
          ].map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-number">{idx + 1}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              <ul className="step-list">
                {step.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* What You'll Need */}
      <section className="health-requirements">
        <h2 className="section-title">What You'll Need</h2>
        <div className="requirements-grid">
          <div className="requirement-card">
            <h3 className="requirement-title">Personal Information</h3>
            <ul>
              <li>Full name and date of birth</li>
              <li>Blood type (if known)</li>
              <li>Known allergies and reactions</li>
              <li>Emergency contact details</li>
              <li>Insurance information</li>
            </ul>
          </div>
          <div className="requirement-card">
            <h3 className="requirement-title">Medical Documents</h3>
            <ul>
              <li>Recent test results</li>
              <li>Current prescriptions</li>
              <li>Vaccination records</li>
              <li>Medical history summaries</li>
              <li>Specialist reports</li>
            </ul>
          </div>
          <div className="requirement-card">
            <h3 className="requirement-title">Current Medications</h3>
            <ul>
              <li>Prescription medication list</li>
              <li>Over-the-counter drugs</li>
              <li>Supplements and vitamins</li>
              <li>Dosage information</li>
              <li>Prescribing doctors</li>
            </ul>
          </div>
        </div>
      </section>

      {/* After Setup */}
      <section className="health-after-setup">
        <h2 className="section-title">What Happens After Setup?</h2>
        <div className="after-grid">
          {/* Benefits */}
          <div className="after-benefits">
            <h3 className="benefits-title">Immediate Benefits</h3>
            <ul>
              <li>
                Instant Organization of all records in one secure location
              </li>
              <li>Emergency Preparedness with QR for fast response</li>
              <li>
                Smart Reminders for medication, appointments, and checkups
              </li>
              <li>Easy Sharing with doctors and family securely</li>
            </ul>
          </div>

          {/* Stats */}
          <div className="after-stats">
            <h3 className="stats-title">Your Health, Organized</h3>
            <p className="stats-subtext">
              Join over 50,000 users who have transformed their health
              management with HealthTrack™.
            </p>
            <div className="stats-numbers">
              <div>
                <p className="stats-number">50K+</p>
                <p className="stats-label">Active Users</p>
              </div>
              <div>
                <p className="stats-number">99.9%</p>
                <p className="stats-label">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthProfile;
