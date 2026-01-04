// frontend/src/pages/FormPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/form.css";

function FormPage() {
  const [formData, setFormData] = useState({
    // 1. Personal Information
    fullName: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    contactNumber: "",
    email: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",

    // 2. Medical History
    allergies: "",
    chronicConditions: "",
    pastSurgeries: "",
    vaccinations: "",
    familyHistory: "",

    // 3. Current Medications
    medicationName: "",
    dosage: "",
    frequency: "",
    medStartDate: "",
    medEndDate: "",
    prescribingDoctor: "",

    // 4. Lab & Test Reports
    testName: "",
    testDate: "",
    testResults: "",
    labName: "",
    testFile: null,

    // 5. Prescriptions
    prescriptionName: "",
    prescriptionDoctor: "",
    prescriptionDate: "",
    prescriptionFile: null,

    // 6. Health Metrics
    height: "",
    weight: "",
    bmi: "",
    bmiCategory: "",
    bloodPressure: "",
    heartRate: "",
    sugarLevels: "",
    cholesterol: "",

    // 7. Insurance Info
    insuranceProvider: "",
    policyNumber: "",
    validTill: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");
  const navigate = useNavigate();

  // Server details
  const serverIP = process.env.REACT_APP_SERVER_IP || "10.121.219.1";
  const serverPort = process.env.REACT_APP_SERVER_PORT || "5000";

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // ✅ Auto-calculate BMI
  useEffect(() => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      const bmiValue = (
        formData.weight /
        (heightInMeters * heightInMeters)
      ).toFixed(2);

      let category = "";
      if (bmiValue < 18.5) category = "Underweight";
      else if (bmiValue < 24.9) category = "Normal";
      else if (bmiValue < 29.9) category = "Overweight";
      else category = "Obese";

      setFormData((prev) => ({
        ...prev,
        bmi: bmiValue,
        bmiCategory: category,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        bmi: "",
        bmiCategory: "",
      }));
    }
  }, [formData.height, formData.weight]);

  // ✅ Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.contactNumber.trim()) errors.contactNumber = "Contact number is required";
    
    return errors;
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      setSubmitStatus("submitting");
      
      const token = localStorage.getItem("token");
      const data = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          data.append(key, value);
        }
      });

      const res = await fetch(`http://${serverIP}:${serverPort}/api/records`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setSubmitStatus("error");
        console.error("Submission error:", result.message);
      }
    } catch (err) {
      setSubmitStatus("error");
      console.error("Network error:", err);
    }
  };

  return (
    <div className="form-container" style={{ padding: "20px" }}>
      <h2>Start Your Health Journey</h2>
      
      {submitStatus === "success" && (
        <div className="success-message">
          ✅ Health record submitted successfully! Redirecting to dashboard...
        </div>
      )}
      
      {submitStatus === "error" && (
        <div className="error-message">
          ❌ Failed to submit health record. Please try again.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {/* ---------------- 1. Personal Information ---------------- */}
        <Section title="1. Personal Information">
          <Input 
            label="Full Name" 
            name="fullName" 
            required 
            value={formData.fullName} 
            onChange={handleChange} 
            error={formErrors.fullName}
          />
          <Input 
            type="date" 
            label="Date of Birth" 
            name="dateOfBirth" 
            value={formData.dateOfBirth} 
            onChange={handleChange} 
          />
          <Select 
            label="Gender" 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange} 
            options={["Male", "Female", "Other"]} 
          />
          <Input 
            label="Blood Group" 
            name="bloodGroup" 
            value={formData.bloodGroup} 
            onChange={handleChange} 
          />
          <Input 
            label="Phone" 
            name="contactNumber" 
            value={formData.contactNumber} 
            onChange={handleChange} 
            error={formErrors.contactNumber}
            required
          />
          <Input 
            type="email" 
            label="Email" 
            name="email" 
            required 
            value={formData.email} 
            onChange={handleChange} 
            error={formErrors.email}
          />
          <Textarea 
            label="Address" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
          />
          <Input 
            label="Emergency Contact Name" 
            name="emergencyContactName" 
            value={formData.emergencyContactName} 
            onChange={handleChange} 
          />
          <Input 
            label="Emergency Contact Phone" 
            name="emergencyContactPhone" 
            value={formData.emergencyContactPhone} 
            onChange={handleChange} 
          />
          <Input 
            label="Relationship" 
            name="emergencyContactRelation" 
            value={formData.emergencyContactRelation} 
            onChange={handleChange} 
          />
        </Section>

        {/* ---------------- 2. Medical History ---------------- */}
        <Section title="2. Medical History">
          <Textarea 
            label="Allergies" 
            name="allergies" 
            value={formData.allergies} 
            onChange={handleChange} 
          />
          <Textarea 
            label="Chronic Conditions" 
            name="chronicConditions" 
            value={formData.chronicConditions} 
            onChange={handleChange} 
          />
          <Textarea 
            label="Past Surgeries" 
            name="pastSurgeries" 
            value={formData.pastSurgeries} 
            onChange={handleChange} 
          />
          <Textarea 
            label="Vaccination Records" 
            name="vaccinations" 
            value={formData.vaccinations} 
            onChange={handleChange} 
          />
          <Textarea 
            label="Family Medical History" 
            name="familyHistory" 
            value={formData.familyHistory} 
            onChange={handleChange} 
          />
        </Section>

        {/* ---------------- 3. Current Medications ---------------- */}
        <Section title="3. Current Medications">
          <Input 
            label="Medication Name" 
            name="medicationName" 
            value={formData.medicationName} 
            onChange={handleChange} 
          />
          <Input 
            label="Dosage" 
            name="dosage" 
            value={formData.dosage} 
            onChange={handleChange} 
          />
          <Input 
            label="Frequency" 
            name="frequency" 
            value={formData.frequency} 
            onChange={handleChange} 
          />
          <Input 
            type="date" 
            label="Start Date" 
            name="medStartDate" 
            value={formData.medStartDate} 
            onChange={handleChange} 
          />
          <Input 
            type="date" 
            label="End Date" 
            name="medEndDate" 
            value={formData.medEndDate} 
            onChange={handleChange} 
          />
          <Input 
            label="Prescribing Doctor" 
            name="prescribingDoctor" 
            value={formData.prescribingDoctor} 
            onChange={handleChange} 
          />
        </Section>

        {/* ---------------- 4. Lab Reports ---------------- */}
        <Section title="4. Laboratory & Test Reports">
          <Input 
            label="Test Name" 
            name="testName" 
            value={formData.testName} 
            onChange={handleChange} 
          />
          <Input 
            type="date" 
            label="Date of Test" 
            name="testDate" 
            value={formData.testDate} 
            onChange={handleChange} 
          />
          <Textarea 
            label="Results" 
            name="testResults" 
            value={formData.testResults} 
            onChange={handleChange} 
          />
          <Input 
            label="Doctor / Lab Name" 
            name="labName" 
            value={formData.labName} 
            onChange={handleChange} 
          />
          <Input 
            type="file" 
            label="Upload Report" 
            name="testFile" 
            onChange={handleChange} 
          />
        </Section>

        {/* ---------------- 5. Prescriptions ---------------- */}
        <Section title="5. Prescriptions">
          <Input 
            label="Prescription Name" 
            name="prescriptionName" 
            value={formData.prescriptionName} 
            onChange={handleChange} 
          />
          <Input 
            label="Doctor" 
            name="prescriptionDoctor" 
            value={formData.prescriptionDoctor} 
            onChange={handleChange} 
          />
          <Input 
            type="date" 
            label="Date" 
            name="prescriptionDate" 
            value={formData.prescriptionDate} 
            onChange={handleChange} 
          />
          <Input 
            type="file" 
            label="Upload Prescription" 
            name="prescriptionFile" 
            onChange={handleChange} 
          />
        </Section>

        {/* ---------------- 6. Health Metrics ---------------- */}
        <Section title="6. Health Metrics">
          <Input 
            type="number" 
            label="Height (cm)" 
            name="height" 
            value={formData.height} 
            onChange={handleChange} 
          />
          <Input 
            type="number" 
            label="Weight (kg)" 
            name="weight" 
            value={formData.weight} 
            onChange={handleChange} 
          />
          <Input 
            label="BMI (auto)" 
            name="bmi" 
            value={formData.bmi} 
            readOnly 
          />
          {formData.bmi && <p style={{ fontWeight: "bold", color: "green" }}>Category: {formData.bmiCategory}</p>}
          <Input 
            label="Blood Pressure" 
            name="bloodPressure" 
            value={formData.bloodPressure} 
            onChange={handleChange} 
          />
          <Input 
            label="Heart Rate" 
            name="heartRate" 
            value={formData.heartRate} 
            onChange={handleChange} 
          />
          <Input 
            label="Sugar Levels" 
            name="sugarLevels" 
            value={formData.sugarLevels} 
            onChange={handleChange} 
          />
          <Input 
            label="Cholesterol" 
            name="cholesterol" 
            value={formData.cholesterol} 
            onChange={handleChange} 
          />
        </Section>

        {/* ---------------- 7. Insurance ---------------- */}
        <Section title="7. Insurance Info">
          <Input 
            label="Provider" 
            name="insuranceProvider" 
            value={formData.insuranceProvider} 
            onChange={handleChange} 
          />
          <Input 
            label="Policy Number" 
            name="policyNumber" 
            value={formData.policyNumber} 
            onChange={handleChange} 
          />
          <Input 
            type="date" 
            label="Valid Till" 
            name="validTill" 
            value={formData.validTill} 
            onChange={handleChange} 
          />
        </Section>

        {/* ---------------- Submit ---------------- */}
        <button
          type="submit"
          style={{ marginTop: "15px", padding: "10px", fontWeight: "bold" }}
          disabled={submitStatus === "submitting"}
        >
          {submitStatus === "submitting" ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default FormPage;

/* ---------------- Reusable Components ---------------- */
const Section = ({ title, children }) => (
  <div>
    <h3>{title}</h3>
    {children}
  </div>
);

const Input = ({ label, error, ...props }) => (
  <label>
    {label}: 
    <input {...props} />
    {error && <span className="field-error">{error}</span>}
  </label>
);

const Textarea = ({ label, ...props }) => (
  <label>
    {label}: <textarea {...props}></textarea>
  </label>
);

const Select = ({ label, options, ...props }) => (
  <label>
    {label}:{" "}
    <select {...props}>
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </label>
);