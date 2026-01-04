import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./../styles/Dashboard.css";

function Dashboard() {
  const [records, setRecords] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrRecordId, setQrRecordId] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [error, setError] = useState("");

  const serverIP = process.env.REACT_APP_SERVER_IP || "10.121.219.1";
const serverPort = process.env.REACT_APP_SERVER_PORT || "5000";

const baseUrl = `http://${serverIP}:${serverPort}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Not authenticated. Please log in.");
          setLoading(false);
          return;
        }
        
        // Fetch user data
        const userResponse = await fetch(`${baseUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        
        const userData = await userResponse.json();
        if (userData.success) {
          setUser(userData.data.user);
        }
        
        // Fetch records
        const recordsResponse = await fetch(`${baseUrl}/api/records`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!recordsResponse.ok) {
          throw new Error("Failed to fetch records");
        }
        
        const recordsData = await recordsResponse.json();
        if (recordsData.success) {
          setRecords(recordsData.data);
          
          // Set the first record as default for QR code
          if (recordsData.data.length > 0) {
            setQrRecordId(recordsData.data[0]._id);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl]);

  const generateQrCode = async () => {
    if (!qrRecordId) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/api/qr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recordId: qrRecordId }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }
      
      const data = await response.json();
      if (data.success) {
        setQrCodeUrl(data.qrCode);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      setError("Failed to generate QR code");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading your health data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Health Dashboard</h2>
        <p>Welcome back, {user?.fullName || "User"}</p>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <h4>Total Records</h4>
          <p>{records.length}</p>
        </div>
        <div className="stat-card">
          <h4>Medical History</h4>
          <p>{records.filter(r => r.allergies || r.chronicConditions).length}</p>
        </div>
        <div className="stat-card">
          <h4>Medications</h4>
          <p>{records.filter(r => r.medicationName).length}</p>
        </div>
        <div className="stat-card">
          <h4>Lab Reports</h4>
          <p>{records.filter(r => r.testFile).length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === "personal" ? "active" : ""}`}
          onClick={() => setActiveTab("personal")}
        >
          Personal Info
        </button>
        <button
          className={`tab-btn ${activeTab === "medical" ? "active" : ""}`}
          onClick={() => setActiveTab("medical")}
        >
          Medical History
        </button>
        <button
          className={`tab-btn ${activeTab === "medications" ? "active" : ""}`}
          onClick={() => setActiveTab("medications")}
        >
          Medications
        </button>
        <button
          className={`tab-btn ${activeTab === "lab" ? "active" : ""}`}
          onClick={() => setActiveTab("lab")}
        >
          Lab Reports
        </button>
        <button
          className={`tab-btn ${activeTab === "qr" ? "active" : ""}`}
          onClick={() => setActiveTab("qr")}
        >
          QR Code
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "overview" && (
          <>
            {records.length === 0 ? (
              <div className="empty-state">
                <p className="empty-title">No Health Records</p>
                <p className="empty-sub">
                  Add your health records to see them here.
                </p>
                <button className="add-btn" onClick={() => window.location.href = "/form"}>
                  + Add Record
                </button>
              </div>
            ) : (
              <div className="records-grid">
                {records.map((record, idx) => (
                  <div key={idx} className="record-card">
                    <h4>{record.fullName}</h4>
                    <p><strong>Email:</strong> {record.email || "N/A"}</p>
                    <p><strong>Phone:</strong> {record.contactNumber || "N/A"}</p>
                    <p><strong>Blood Group:</strong> {record.bloodGroup || "N/A"}</p>
                    {record.allergies && <p><strong>Allergies:</strong> {record.allergies}</p>}
                    {record.chronicConditions && <p><strong>Conditions:</strong> {record.chronicConditions}</p>}
                    <div className="record-actions">
                      <button 
                        className="view-details-btn"
                        onClick={() => {
                          setQrRecordId(record._id);
                          setActiveTab("personal");
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "personal" && (
          <>
            {records.length === 0 ? (
              <div className="empty-state">
                <p className="empty-title">No Personal Information</p>
                <p className="empty-sub">
                  Add your personal details to see them here.
                </p>
                <button className="add-btn" onClick={() => window.location.href = "/form"}>
                  + Add Info
                </button>
              </div>
            ) : (
              <div className="records-list">
                {records
                  .filter(record => qrRecordId ? record._id === qrRecordId : true)
                  .map((record, idx) => (
                  <div key={idx} className="detail-card">
                    <h4>{record.fullName}</h4>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <label>Date of Birth:</label>
                        <span>{record.dateOfBirth ? new Date(record.dateOfBirth).toLocaleDateString() : "N/A"}</span>
                      </div>
                      <div className="detail-item">
                        <label>Gender:</label>
                        <span>{record.gender || "N/A"}</span>
                      </div>
                      <div className="detail-item">
                        <label>Blood Group:</label>
                        <span>{record.bloodGroup || "N/A"}</span>
                      </div>
                      <div className="detail-item">
                        <label>Contact Number:</label>
                        <span>{record.contactNumber || "N/A"}</span>
                      </div>
                      <div className="detail-item">
                        <label>Email:</label>
                        <span>{record.email || "N/A"}</span>
                      </div>
                      <div className="detail-item">
                        <label>Address:</label>
                        <span>{record.address || "N/A"}</span>
                      </div>
                      <div className="detail-item">
                        <label>Emergency Contact:</label>
                        <span>{record.emergencyContactName || "N/A"} ({record.emergencyContactRelation || "N/A"})</span>
                      </div>
                      <div className="detail-item">
                        <label>Emergency Phone:</label>
                        <span>{record.emergencyContactPhone || "N/A"}</span>
                      </div>
                      <div className="detail-item">
                        <label>Insurance Provider:</label>
                        <span>{record.insuranceProvider || "N/A"}</span>
                      </div>
                      <div className="detail-item">
                        <label>Policy Number:</label>
                        <span>{record.policyNumber || "N/A"}</span>
                      </div>
                      <div className="detail-item">
                        <label>Valid Till:</label>
                        <span>{record.validTill ? new Date(record.validTill).toLocaleDateString() : "N/A"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "medical" && (
          <>
            {records.filter(r => r.allergies || r.chronicConditions || r.pastSurgeries || r.vaccinations || r.familyHistory).length === 0 ? (
              <div className="empty-state">
                <p className="empty-title">No Medical History</p>
                <p className="empty-sub">
                  Add your medical history to see it here.
                </p>
                <button className="add-btn" onClick={() => window.location.href = "/form"}>
                  + Add History
                </button>
              </div>
            ) : (
              <div className="records-list">
                {records
                  .filter(record => record.allergies || record.chronicConditions || record.pastSurgeries || record.vaccinations || record.familyHistory)
                  .map((record, idx) => (
                    <div key={idx} className="detail-card">
                      <h4>{record.fullName}</h4>
                      <div className="detail-grid">
                        {record.allergies && (
                          <div className="detail-item">
                            <label>Allergies:</label>
                            <span>{record.allergies}</span>
                          </div>
                        )}
                        {record.chronicConditions && (
                          <div className="detail-item">
                            <label>Chronic Conditions:</label>
                            <span>{record.chronicConditions}</span>
                          </div>
                        )}
                        {record.pastSurgeries && (
                          <div className="detail-item">
                            <label>Past Surgeries:</label>
                            <span>{record.pastSurgeries}</span>
                          </div>
                        )}
                        {record.vaccinations && (
                          <div className="detail-item">
                            <label>Vaccinations:</label>
                            <span>{record.vaccinations}</span>
                          </div>
                        )}
                        {record.familyHistory && (
                          <div className="detail-item">
                            <label>Family History:</label>
                            <span>{record.familyHistory}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}

        {activeTab === "medications" && (
          <>
            {records.filter(r => r.medicationName).length === 0 ? (
              <div className="empty-state">
                <p className="empty-title">No Medications</p>
                <p className="empty-sub">
                  Add your medications to see them here.
                </p>
                <button className="add-btn" onClick={() => window.location.href = "/form"}>
                  + Add Medication
                </button>
              </div>
            ) : (
              <div className="records-list">
                {records
                  .filter(record => record.medicationName)
                  .map((record, idx) => (
                    <div key={idx} className="detail-card">
                      <h4>{record.fullName}</h4>
                      <div className="detail-grid">
                        <div className="detail-item">
                          <label>Medication:</label>
                          <span>{record.medicationName}</span>
                        </div>
                        {record.dosage && (
                          <div className="detail-item">
                            <label>Dosage:</label>
                            <span>{record.dosage}</span>
                          </div>
                        )}
                        {record.frequency && (
                          <div className="detail-item">
                            <label>Frequency:</label>
                            <span>{record.frequency}</span>
                          </div>
                        )}
                        {record.medStartDate && (
                          <div className="detail-item">
                            <label>Start Date:</label>
                            <span>{new Date(record.medStartDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {record.medEndDate && (
                          <div className="detail-item">
                            <label>End Date:</label>
                            <span>{new Date(record.medEndDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {record.prescribingDoctor && (
                          <div className="detail-item">
                            <label>Prescribing Doctor:</label>
                            <span>{record.prescribingDoctor}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}

        {activeTab === "lab" && (
          <>
            {records.filter(r => r.testName || r.testFile).length === 0 ? (
              <div className="empty-state">
                <p className="empty-title">No Lab Reports</p>
                <p className="empty-sub">
                  Upload your lab results to see them here.
                </p>
                <button className="add-btn" onClick={() => window.location.href = "/form"}>
                  + Upload Report
                </button>
              </div>
            ) : (
              <div className="records-list">
                {records
                  .filter(record => record.testName || record.testFile)
                  .map((record, idx) => (
                    <div key={idx} className="detail-card">
                      <h4>{record.fullName}</h4>
                      <div className="detail-grid">
                        {record.testName && (
                          <div className="detail-item">
                            <label>Test Name:</label>
                            <span>{record.testName}</span>
                          </div>
                        )}
                        {record.testDate && (
                          <div className="detail-item">
                            <label>Test Date:</label>
                            <span>{new Date(record.testDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {record.testResults && (
                          <div className="detail-item">
                            <label>Results:</label>
                            <span>{record.testResults}</span>
                          </div>
                        )}
                        {record.labName && (
                          <div className="detail-item">
                            <label>Lab Name:</label>
                            <span>{record.labName}</span>
                          </div>
                        )}
                        {record.testFile && (
                          <div className="detail-item">
                            <label>Report:</label>
                            <a href={`${baseUrl}/${record.testFile}`} target="_blank" rel="noreferrer">
                              View Report
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}

        {activeTab === "qr" && (
          <div className="qr-section">
            <h3>Emergency QR Code</h3>
            
            {records.length === 0 ? (
              <div className="empty-state">
                <p className="empty-title">No Records Available</p>
                <p className="empty-sub">
                  Add health records to generate a QR code.
                </p>
                <button className="add-btn" onClick={() => window.location.href = "/form"}>
                  + Add Record
                </button>
              </div>
            ) : (
              <>
                <div className="qr-controls">
                  <label>Select Record for QR Code:</label>
                  <select 
                    value={qrRecordId || ""} 
                    onChange={(e) => setQrRecordId(e.target.value)}
                  >
                    {records.map(record => (
                      <option key={record._id} value={record._id}>
                        {record.fullName} - {record.dateOfBirth ? new Date(record.dateOfBirth).toLocaleDateString() : "No DOB"}
                      </option>
                    ))}
                  </select>
                  <button onClick={generateQrCode} className="generate-qr-btn">
                    Generate QR Code
                  </button>
                </div>

                {qrCodeUrl ? (
                  <div className="qr-display">
                    <QRCodeCanvas value={qrCodeUrl} size={200} />
                    <p>Scan this QR code to access emergency health information</p>
                    <div className="qr-actions">
                      <button 
                        className="download-btn"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = qrCodeUrl;
                          link.download = `health-qr-${qrRecordId}.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        Download QR Code
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="qr-placeholder">Click "Generate QR Code" to create a QR code for the selected record.</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;