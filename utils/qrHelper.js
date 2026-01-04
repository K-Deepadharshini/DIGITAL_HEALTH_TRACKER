import QRCode from "qrcode";

/**
 * Generate a QR code from any given data
 * @param {Object|String} data - Data to encode (object will be stringified)
 * @returns {Promise<String>} Base64 PNG Data URL
 */
export const generateQR = async (data) => {
  try {
    // If it's an object, convert it to JSON
    const inputData = typeof data === "object" ? JSON.stringify(data) : String(data);

    // Generate QR code as Base64 PNG
    const qrImage = await QRCode.toDataURL(inputData);

    return qrImage;
  } catch (error) {
    console.error("❌ Error generating QR:", error);
    throw error;
  }
};
