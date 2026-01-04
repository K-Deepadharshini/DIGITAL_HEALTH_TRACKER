// backend/models/Record.js
import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // 1. Personal Information
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String },
    bloodGroup: { type: String },
    contactNumber: { type: String },
    email: { type: String },
    address: { type: String },
    // 4. Emergency Contact
    emergencyContactName: { type: String },
    emergencyContactRelation: { type: String },
    emergencyContactPhone: { type: String },

    // 2. Medical History
    allergies: { type: String },
    chronicConditions: { type: String },
    pastSurgeries: { type: String },
    vaccinations: { type: String },
    familyHistory: { type: String },
    // 3. Current Medications
    medicationName: { type: String },
    dosage: { type: String },
    frequency: { type: String },
    medStartDate: { type: Date },
    medEndDate: { type: Date },
    prescribingDoctor: { type: String },
    // 4. Test Details
    testName: { type: String },
    testDate: { type: Date },
    testResults: { type: String },
    labName: { type: String },
    testFile: { type: String },
    // 8. Prescription Details
    prescriptionName: { type: String },
    prescriptionDoctor: { type: String },
    prescriptionDate: { type: Date },
    prescriptionFile: { type: String },
    // 6. Health Metrics
    height: { type: String },
    weight: { type: String },
    bmi: { type: String },
    bmiCategory: { type: String },
    bloodPressure: { type: String },
    heartRate: { type: String },
    sugarLevels: { type: String },
    cholesterol: { type: String },
    // 5. Insurance Info
    insuranceProvider: { type: String },
    policyNumber: { type: String },
    validTill: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Record", recordSchema);