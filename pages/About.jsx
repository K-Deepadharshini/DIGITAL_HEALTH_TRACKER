import React from "react";
import "./../styles/App.css";

const About = () => {
  return (
    <div className="about-section-wrapper px-6 py-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="about-header text-center mb-12">
        <span className="about-badge px-4 py-1 rounded-full text-sm font-medium">
          About HealthTracker
        </span>
        <h1 className="about-title text-3xl md:text-4xl font-bold mt-4">
          One Platform for All Your Health Needs
        </h1>
        <p className="about-subtext mt-4 max-w-2xl mx-auto">
          Managing your health shouldn't be complicated. We've created a simple,
          secure solution to keep your medical information organized and
          accessible.
        </p>
      </div>

      {/* Problem & Solution Section */}
      <div className="about-problem-solution grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Problem Card */}
        <div className="about-problem-card rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="about-problem-icon text-xl">📄</span>
            <h2 className="about-problem-title text-lg font-bold">
              The Problem
            </h2>
          </div>
          <p className="about-problem-text leading-relaxed">
            People lack a single space to manage medical details, prescriptions,
            reports, allergies, and vaccination history. Missing records in
            emergencies delay treatment and risk lives. Scattered information
            across different providers creates gaps in care.
          </p>
        </div>

        {/* Solution Card */}
        <div className="about-solution-card rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="about-solution-icon text-xl">✅</span>
            <h2 className="about-solution-title text-lg font-bold">
              Our Solution
            </h2>
          </div>
          <p className="about-solution-text leading-relaxed">
            A digital health tracker provides one secure platform to store, view,
            and share health data. Emergency QR codes give instant access to vital
            info like blood group, allergies, medical history, and medications.
            Consent-based sharing ensures privacy while enabling fast access in
            emergencies.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="about-features grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        <div className="about-feature-card rounded-2xl p-6 shadow-sm text-center">
          <span className="about-feature-icon text-2xl">📄</span>
          <h3 className="about-feature-title font-semibold mt-3">
            Medical Records
          </h3>
          <p className="about-feature-text text-sm">
            Secure storage of all your health documents
          </p>
        </div>

        <div className="about-feature-card rounded-2xl p-6 shadow-sm text-center">
          <span className="about-feature-icon text-2xl">🔳</span>
          <h3 className="about-feature-title font-semibold mt-3">Emergency QR</h3>
          <p className="about-feature-text text-sm">
            Instant access to critical health info
          </p>
        </div>

        <div className="about-feature-card rounded-2xl p-6 shadow-sm text-center">
          <span className="about-feature-icon text-2xl">🔒</span>
          <h3 className="about-feature-title font-semibold mt-3">
            Privacy & Security
          </h3>
          <p className="about-feature-text text-sm">
            Bank-level encryption and consent controls
          </p>
        </div>

        <div className="about-feature-card rounded-2xl p-6 shadow-sm text-center">
          <span className="about-feature-icon text-2xl">🔔</span>
          <h3 className="about-feature-title font-semibold mt-3">Reminders</h3>
          <p className="about-feature-text text-sm">
            Never miss vaccinations or checkups
          </p>
        </div>

        <div className="about-feature-card rounded-2xl p-6 shadow-sm text-center">
          <span className="about-feature-icon text-2xl">🩺</span>
          <h3 className="about-feature-title font-semibold mt-3">
            Doctor Consultation
          </h3>
          <p className="about-feature-text text-sm">
            Easy sharing with healthcare providers
          </p>
        </div>

        <div className="about-feature-card rounded-2xl p-6 shadow-sm text-center">
          <span className="about-feature-icon text-2xl">⏰</span>
          <h3 className="about-feature-title font-semibold mt-3">24/7 Access</h3>
          <p className="about-feature-text text-sm">
            Your health data, anytime, anywhere
          </p>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="about-why-choose rounded-2xl p-10 text-center">
        <h2 className="about-why-title text-2xl font-bold mb-4">
          Why Choose HealthTracker?
        </h2>
        <p className="about-why-subtext mb-10">
          Experience the benefits of organized, accessible healthcare
        </p>

        <div className="about-why-grid grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="about-why-card">
            <span className="about-why-icon text-2xl">🛡️</span>
            <h3 className="about-why-card-title font-semibold mt-3">
              Easy Access
            </h3>
            <p className="about-why-card-text text-sm">
              Complete health history at your fingertips
            </p>
          </div>
          <div className="about-why-card">
            <span className="about-why-icon text-2xl">🔔</span>
            <h3 className="about-why-card-title font-semibold mt-3">
              Smart Reminders
            </h3>
            <p className="about-why-card-text text-sm">
              Never miss important vaccination dates
            </p>
          </div>
          <div className="about-why-card">
            <span className="about-why-icon text-2xl">🔒</span>
            <h3 className="about-why-card-title font-semibold mt-3">
              Secure Storage
            </h3>
            <p className="about-why-card-text text-sm">
              Military-grade encryption for your data
            </p>
          </div>
          <div className="about-why-card">
            <span className="about-why-icon text-2xl">👨‍⚕️</span>
            <h3 className="about-why-card-title font-semibold mt-3">
              Doctor Consultation
            </h3>
            <p className="about-why-card-text text-sm">
              Seamless sharing with healthcare providers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
