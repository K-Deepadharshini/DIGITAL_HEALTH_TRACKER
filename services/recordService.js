import axios from "axios";

// Base API URL (proxy in vite.config.js will handle /api -> http://localhost:5000)
const API_URL = "/api/records";

// ✅ Fetch all records for a user
export const getRecords = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching records:", error);
    throw error;
  }
};

// ✅ Add a new medical record
export const addRecord = async (recordData) => {
  try {
    const response = await axios.post(API_URL, recordData);
    return response.data;
  } catch (error) {
    console.error("Error adding record:", error);
    throw error;
  }
};

// ✅ Delete a record by ID
export const deleteRecord = async (recordId) => {
  try {
    const response = await axios.delete(`${API_URL}/${recordId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting record:", error);
    throw error;
  }
};
