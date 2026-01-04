import React, { useState } from "react";
import axios from "axios";
import QRCodeDisplay from "../components/QRCodeDisplay";

function Emergency() {
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://10.121.219.1:5000/api/qr", {
        bloodGroup: "O+",
        allergies: "Peanuts",
        conditions: "Diabetes",
        emergencyContact: "+91-9876543210",
      });

      if (response.data.qrCode) {
        setQrCode(response.data.qrCode);
      } else {
        console.error("⚠️ QR code not received");
      }
    } catch (error) {
      console.error("❌ Error generating QR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Emergency QR</h1>

      <button
        onClick={generateQR}
        disabled={loading}
        style={{
          padding: "10px 20px",
          background: loading ? "#999" : "#006D77",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: "20px",
        }}
      >
        {loading ? "Generating..." : "Generate QR"}
      </button>

      {/* Show QR code when available */}
      {qrCode ? (
        <QRCodeDisplay qrCode={qrCode} />
      ) : (
        <p>No QR code generated yet.</p>
      )}
    </div>
  );
}

export default Emergency;
