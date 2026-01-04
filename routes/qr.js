import express from "express";
import { generateQrCode, generateRecordPDF } from "../controllers/qrController.js";

const router = express.Router();

// POST /api/qr → generate QR code
router.post("/", generateQrCode);

// GET /api/qr/records/:recordId/pdf → generate PDF
router.get("/records/:recordId/pdf", generateRecordPDF);

export default router;
