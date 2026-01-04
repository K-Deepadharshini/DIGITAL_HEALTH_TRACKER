import React, { useState } from "react";

function QRCodeDisplay({ recordId }) {
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateQR = async () => {
    if (!recordId) {
      alert("❌ No recordId provided!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://10.121.219.1:5000/api/qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId }), // ✅ send recordId
      });

      const data = await response.json();
      if (data.success) {
        setQrCode(data.qrCode);
      } else {
        alert("❌ Failed to generate QR: " + (data.message || ""));
      }
    } catch (error) {
      console.error("❌ Error fetching QR:", error);
      alert("Server error while generating QR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={handleGenerateQR}
        style={{
          padding: "10px 20px",
          backgroundColor: "#006D77",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "15px",
        }}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate QR Code"}
      </button>

      {!qrCode ? (
        <p style={{ color: "#555" }}>No QR code generated yet.</p>
      ) : (
        <>
          <h3>Emergency QR Code</h3>
          <img
            src={qrCode}
            alt="Emergency Health QR Code"
            style={{
              width: "200px",
              height: "200px",
              border: "2px solid #006D77",
              borderRadius: "8px",
              padding: "5px",
              background: "#fff",
            }}
          />
          <p style={{ marginTop: "10px", fontSize: "14px", color: "#333" }}>
            Scan this QR code to quickly access emergency health details.
          </p>
        </>
      )}
    </div>
  );
}

export default QRCodeDisplay;
