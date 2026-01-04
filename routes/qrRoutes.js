// backend/routes/qrRoutes.js
import express from "express";
import { generateQrCode, generateRecordPDF } from "../controllers/qrController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post("/", generateQrCode);
router.get("/records/:recordId/pdf", generateRecordPDF);

export default router;