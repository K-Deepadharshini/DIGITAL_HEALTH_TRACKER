// backend/controllers/qrController.js
import QRCode from "qrcode";
import Record from "../models/Record.js";
import { generatePDF } from "../utils/pdfGenerator.js";

export const generateQrCode = async (req, res) => {
  try {
    const { recordId } = req.body;
    const userId = req.user._id;

    if (!recordId) {
      return res.status(400).json({
        success: false,
        message: "⚠️ RecordId is required",
      });
    }

    // Verify the record belongs to the authenticated user
    const record = await Record.findOne({ _id: recordId, user: userId });
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found or access denied",
      });
    }

    const serverBaseUrl = process.env.SERVER_BASE_URL || "http://10.121.219.1:5000";
    const pdfUrl = `${serverBaseUrl}/api/qr/records/${recordId}/pdf`;

    const qrCodeDataUrl = await QRCode.toDataURL(pdfUrl);

    res.json({
      success: true,
      qrCode: qrCodeDataUrl,
      link: pdfUrl,
    });
  } catch (error) {
    console.error("❌ QR generation error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating QR",
      error: error.message,
    });
  }
};

export const generateRecordPDF = async (req, res) => {
  try {
    const { recordId } = req.params;
    const userId = req.user._id;

    // Fetch the record from MongoDB (only if belongs to user)
    const record = await Record.findOne({ _id: recordId, user: userId });
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "⚠️ Record not found",
      });
    }

    // Generate PDF buffer using helper
    const pdfBuffer = await generatePDF(record);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="record-${recordId}.pdf"`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("❌ PDF generation error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating PDF",
      error: error.message,
    });
  }
};