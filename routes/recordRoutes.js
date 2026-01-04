// backend/routes/recordRoutes.js
import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/auth.js";
import {
  createRecord,
  getRecords,
  getRecordById,
  generateRecordPdf,
  updateRecord,
  deleteRecord,
} from "../controllers/recordController.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Create record (with file upload support)
router.post(
  "/",
  upload.fields([
    { name: "testFile", maxCount: 1 },
    { name: "prescriptionFile", maxCount: 1 },
  ]),
  createRecord
);

// Get all records
router.get("/", getRecords);

// Get single record by ID
router.get("/:id", getRecordById);

// Generate PDF for a record
router.get("/:id/pdf", generateRecordPdf);

// Update record (with file upload support)
router.put(
  "/:id",
  upload.fields([
    { name: "testFile", maxCount: 1 },
    { name: "prescriptionFile", maxCount: 1 },
  ]),
  updateRecord
);

// Delete record
router.delete("/:id", deleteRecord);

export default router;