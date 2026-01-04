// backend/controllers/recordController.js
import Record from "../models/Record.js";
import { generatePDF } from "../utils/pdfGenerator.js";

// Create new health record (with files)
export const createRecord = async (req, res) => {
  try {
    const bodyData = { ...req.body, user: req.user._id };

    // Handle file uploads
    if (req.files?.testFile) {
      bodyData.testFile = `uploads/${req.files.testFile[0].filename}`;
    }
    if (req.files?.prescriptionFile) {
      bodyData.prescriptionFile = `uploads/${req.files.prescriptionFile[0].filename}`;
    }

    const newRecord = new Record(bodyData);
    const savedRecord = await newRecord.save();

    res.status(201).json({ success: true, data: savedRecord });
  } catch (err) {
    console.error("❌ Error creating record:", err.message);
    res.status(500).json({ success: false, message: "Failed to create record" });
  }
};

// Get all records for the authenticated user
export const getRecords = async (req, res) => {
  try {
    const records = await Record.find({ user: req.user._id });
    res.json({ success: true, data: records });
  } catch (err) {
    console.error("❌ Error fetching records:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch records" });
  }
};

// Get single record by ID (only if belongs to user)
export const getRecordById = async (req, res) => {
  try {
    const record = await Record.findOne({ _id: req.params.id, user: req.user._id });
    if (!record) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }
    res.json({ success: true, data: record });
  } catch (err) {
    console.error("❌ Error fetching record:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch record" });
  }
};

// Generate PDF for a record (only if belongs to user)
export const generateRecordPdf = async (req, res) => {
  try {
    const record = await Record.findOne({ _id: req.params.id, user: req.user._id });
    if (!record) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    // Generate PDF in memory
    const pdfBuffer = await generatePDF(record);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=record_${record._id}.pdf`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error("❌ Error generating PDF:", err.message);
    res.status(500).json({ success: false, message: "Failed to generate PDF" });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if record belongs to user
    const existingRecord = await Record.findOne({ _id: id, user: req.user._id });
    if (!existingRecord) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    // If files were uploaded with multer, handle them here
    const bodyData = { ...req.body };
    if (req.files?.testFile) bodyData.testFile = `uploads/${req.files.testFile[0].filename}`;
    if (req.files?.prescriptionFile) bodyData.prescriptionFile = `uploads/${req.files.prescriptionFile[0].filename}`;
    if (req.file) bodyData.file = `uploads/${req.file.filename}`;

    const updated = await Record.findByIdAndUpdate(id, bodyData, { new: true, runValidators: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("❌ Error updating record:", err);
    res.status(500).json({ success: false, message: "Failed to update record" });
  }
};

// Delete a record (only if belongs to user)
export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if record belongs to user
    const record = await Record.findOne({ _id: id, user: req.user._id });
    if (!record) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }
    
    const deleted = await Record.findByIdAndDelete(id);
    res.json({ success: true, message: "Record deleted" });
  } catch (err) {
    console.error("❌ Error deleting record:", err);
    res.status(500).json({ success: false, message: "Failed to delete record" });
  }
};