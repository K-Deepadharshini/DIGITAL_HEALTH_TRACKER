const Record = require("../models/Record");

/**
 * Check if a record is a duplicate
 * @param {String} userId - The ID of the user
 * @param {String} type - The type of record (prescription, report, allergy, vaccination, surgery)
 * @param {String} description - Details of the record
 * @param {Date} date - Date of the record
 * @returns {Promise<Boolean>} - Returns true if duplicate exists, false otherwise
 */
async function isDuplicate(userId, type, description, date) {
  try {
    const duplicate = await Record.findOne({
      userId,
      type,
      description,
      date,
    });

    return duplicate ? true : false;
  } catch (error) {
    console.error("❌ Error checking duplicate:", error);
    return false;
  }
}

module.exports = { isDuplicate };
