import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { createRecord, getRecords } from "../controllers/recordController.js";

const router = express.Router();

// Create a new record with file uploads
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

export default router;
