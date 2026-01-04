import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/Auth.css";

function Login() {
  const [formData, setFormData] = useState({
    aadhaarNumber: "",
    abhaNumber: "",
    mobileNumber: "",
    otp: "",
  });
  const [authMethod, setAuthMethod] = useState("aadhaar"); // 'aadhaar' or 'abha'
  const [step, setStep] = useState(1); // 1: Enter credentials, 2: OTP verification
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
    
    return true;
  };

  const validateStep2 = () => {
    if (!formData.otp.trim() || !/^\d{6}$/.test(formData.otp)) {
      setError("Please enter a valid 6-digit OTP");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setLoading(true);
    
    // Simulate login (in a real app, this would call your backend API)
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any 6-digit OTP is considered valid
      // Store authentication token (in a real app, this would come from the API response)
      localStorage.setItem("token", "demo-token-" + Date.now());
      
      // Login successful - navigate to Home page instead of Dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Login to HealthTracker</h2>
          <p>Access your health records securely</p>
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
        
        <form onSubmit={step === 1 ? handleSendOtp : handleLogin}>
          {step === 1 && (
            <>
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
                <label htmlFor="mobileNumber">Registered Mobile Number</label>
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
                <small className="help-text">
                  OTP will be sent to this mobile number
                </small>
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
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </>
          )}
        </form>
        
        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
          <div className="privacy-notice">
            <small>
              Your Aadhaar/ABHA information is securely verified and encrypted.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;