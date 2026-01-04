import express from "express";
import multer from "multer";
import { createRecord, getRecords } from "../controllers/recordController.js";

const router = express.Router();

// File storage setup (uploads folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save inside /uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // unique filename
  },
});

const upload = multer({ storage });

// Add record with file uploads
router.post("/", upload.fields([
  { name: "testFile", maxCount: 1 },
  { name: "prescriptionFile", maxCount: 1 }
]), createRecord);

router.get("/", getRecords);

export default router;
