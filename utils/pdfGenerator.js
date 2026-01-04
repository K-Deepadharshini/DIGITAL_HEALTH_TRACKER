// backend/utils/pdfGenerator.js
import PDFDocument from "pdfkit";

/**
 * Generate a PDF buffer from a health record
 * @param {Object} record - MongoDB record document
 * @returns {Promise<Buffer>} PDF Buffer
 */
export const generatePDF = (record) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      let buffers = [];

      // Collect PDF data chunks
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => {
        resolve(Buffer.concat(buffers)); // ✅ return Buffer
      });

      // ✅ ---- START CONTENT ----
      doc.fontSize(20).text("Emergency Health Record", { align: "center" });
      doc.moveDown();

      doc.fontSize(14).text(`Full Name: ${record.fullName || "N/A"}`);
      doc.text(`DOB: ${record.dateOfBirth ? new Date(record.dateOfBirth).toLocaleDateString() : "N/A"}`);
      doc.text(`Gender: ${record.gender || "N/A"}`);
      doc.text(`Blood Group: ${record.bloodGroup || "N/A"}`);
      doc.text(`Phone: ${record.contactNumber || "N/A"}`);
      doc.text(`Email: ${record.email || "N/A"}`);
      doc.text(`Address: ${record.address || "N/A"}`);
      doc.moveDown();

      doc.fontSize(16).text("Emergency Contact", { underline: true });
      doc.fontSize(14).text(`Name: ${record.emergencyContactName || "N/A"}`);
      doc.text(`Phone: ${record.emergencyContactPhone || "N/A"}`);
      doc.text(`Relation: ${record.emergencyContactRelation || "N/A"}`);
      doc.moveDown();

      doc.fontSize(16).text("Medical History", { underline: true });
      doc.fontSize(14).text(`Allergies: ${record.allergies || "N/A"}`);
      doc.text(`Chronic Conditions: ${record.chronicConditions || "N/A"}`);
      doc.text(`Past Surgeries: ${record.pastSurgeries || "N/A"}`);
      doc.text(`Vaccinations: ${record.vaccinations || "N/A"}`);
      doc.text(`Family History: ${record.familyHistory || "N/A"}`);
      doc.moveDown();

      doc.fontSize(16).text("Current Medications", { underline: true });
      doc.fontSize(14).text(`Medication: ${record.medicationName || "N/A"}`);
      doc.text(`Dosage: ${record.dosage || "N/A"}`);
      doc.text(`Frequency: ${record.frequency || "N/A"}`);
      doc.text(`Start Date: ${record.medStartDate ? new Date(record.medStartDate).toLocaleDateString() : "N/A"}`);
      doc.text(`End Date: ${record.medEndDate ? new Date(record.medEndDate).toLocaleDateString() : "N/A"}`);
      doc.text(`Prescribing Doctor: ${record.prescribingDoctor || "N/A"}`);
      doc.moveDown();

      doc.fontSize(16).text("Test Details", { underline: true });
      doc.fontSize(14).text(`Test Name: ${record.testName || "N/A"}`);
      doc.text(`Date: ${record.testDate ? new Date(record.testDate).toLocaleDateString() : "N/A"}`);
      doc.text(`Results: ${record.testResults || "N/A"}`);
      doc.text(`Lab: ${record.labName || "N/A"}`);
      doc.moveDown();

      doc.fontSize(16).text("Health Metrics", { underline: true });
      doc.fontSize(14).text(`Height: ${record.height || "N/A"}`);
      doc.text(`Weight: ${record.weight || "N/A"}`);
      doc.text(`BMI: ${record.bmi || "N/A"} (${record.bmiCategory || "N/A"})`);
      doc.text(`Blood Pressure: ${record.bloodPressure || "N/A"}`);
      doc.text(`Heart Rate: ${record.heartRate || "N/A"}`);
      doc.text(`Sugar Levels: ${record.sugarLevels || "N/A"}`);
      doc.text(`Cholesterol: ${record.cholesterol || "N/A"}`);
      doc.moveDown();

      doc.fontSize(16).text("Insurance Information", { underline: true });
      doc.fontSize(14).text(`Provider: ${record.insuranceProvider || "N/A"}`);
      doc.text(`Policy Number: ${record.policyNumber || "N/A"}`);
      doc.text(`Valid Till: ${record.validTill ? new Date(record.validTill).toLocaleDateString() : "N/A"}`);
      // ✅ ---- END CONTENT ----

      doc.end(); // Finalize PDF
    } catch (err) {
      reject(err);
    }
  });
};
