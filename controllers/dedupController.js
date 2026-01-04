const Record = require("../models/Record");

// Deduplication Controller
exports.checkDuplicateAndSave = async (req, res) => {
  try {
    const { userId, type, description, date } = req.body;

    // Check if a similar record already exists for this user
    const duplicate = await Record.findOne({
      userId,
      type,
      description,
      date,
    });

    if (duplicate) {
      return res.status(200).json({
        success: false,
        message: "Duplicate record found. Not saved.",
      });
    }

    // If not duplicate → save record
    const newRecord = new Record({ userId, type, description, date });
    await newRecord.save();

    return res.status(201).json({
      success: true,
      message: "Record saved successfully.",
      record: newRecord,
    });
  } catch (error) {
    console.error("❌ Deduplication Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while checking duplicates",
    });
  }
};
