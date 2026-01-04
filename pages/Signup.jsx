import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/Auth.css";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    aadhaarNumber: "",
    abhaNumber: "",
    mobileNumber: "",
    otp: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [authMethod, setAuthMethod] = useState("aadhaar"); // 'aadhaar' or 'abha'
  const [step, setStep] = useState(1); // 1: Basic info, 2: OTP verification, 3: Set password
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    
    if (authMethod === "aadhaar") {
      if (!formData.aadhaarNumber.trim() || !/^\d{12}$/.test(formData.aadhaarNumber)) {
        setError("Please enter a valid 12-digit Aadhaar number");
        return false;
      }
    } else {
      if (!formData.abhaNumber.trim()) {
        setError("ABHA number is required");
        return false;
      }
    }
    
    if (!formData.mobileNumber.trim() || !/^\d{10}$/.test(formData.mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number");
      return false;
    }
    
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (!formData.otp.trim() || !/^\d{6}$/.test(formData.otp)) {
      setError("Please enter a valid 6-digit OTP");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.password.trim() || formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    return true;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (!validateStep1()) return;
    
    setLoading(true);
    
    // Simulate OTP sending (in a real app, this would call your backend API)
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOtpSent(true);
      setStep(2);
      setError("");
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setLoading(true);
    
    // Simulate OTP verification (in a real app, this would call your backend API)
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any 6-digit OTP is considered valid
      setStep(3);
      setError("");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep3()) return;
    
    setLoading(true);
    
    // Simulate registration (in a real app, this would call your backend API)
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Registration successful
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create HealthTracker Account</h2>
          <p>Sign up using your ABHA or Aadhaar credentials</p>
        </div>
        
        <div className="auth-method-toggle">
          <button
            className={authMethod === "aadhaar" ? "active" : ""}
            onClick={() => setAuthMethod("aadhaar")}
          >
            Aadhaar
          </button>
          <button
            className={authMethod === "abha" ? "active" : ""}
            onClick={() => setAuthMethod("abha")}
          >
            ABHA
          </button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={
          step === 1 ? handleSendOtp : 
          step === 2 ? handleVerifyOtp : 
          handleSubmit
        }>
          {step === 1 && (
            <>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {authMethod === "aadhaar" ? (
                <div className="form-group">
                  <label htmlFor="aadhaarNumber">Aadhaar Number</label>
                  <input
                    type="text"
                    id="aadhaarNumber"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleChange}
                    placeholder="12-digit Aadhaar number"
                    maxLength="12"
                    pattern="[0-9]{12}"
                    required
                  />
                </div>
              ) : (
                <div className="form-group">
                  <label htmlFor="abhaNumber">ABHA Number</label>
                  <input
                    type="text"
                    id="abhaNumber"
                    name="abhaNumber"
                    value={formData.abhaNumber}
                    onChange={handleChange}
                    placeholder="ABHA number"
                    required
                  />
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button type="submit" disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          )}
          
          {step === 2 && (
            <>
              <div className="otp-info">
                <p>We've sent a 6-digit OTP to your mobile number ending with <strong>••••{formData.mobileNumber.slice(-2)}</strong></p>
              </div>
              
              <div className="form-group">
                <label htmlFor="otp">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="6-digit OTP"
                  maxLength="6"
                  pattern="[0-9]{6}"
                  required
                />
              </div>
              
              <div className="auth-actions">
                <button type="button" className="secondary" onClick={() => setStep(1)}>
                  Back
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </>
          )}
          
          {step === 3 && (
            <>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
              
              <div className="auth-actions">
                <button type="button" className="secondary" onClick={() => setStep(2)}>
                  Back
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </>
          )}
        </form>
        
        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
          <div className="privacy-notice">
            <small>
              By creating an account, you agree to our Terms of Service and Privacy Policy.
              Your Aadhaar/ABHA information is securely verified and encrypted.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;