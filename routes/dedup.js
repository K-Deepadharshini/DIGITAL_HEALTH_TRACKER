const express = require("express");
const router = express.Router();
const dedupController = require("../controllers/dedupController");

// Route: Check duplicate before saving record
router.post("/", dedupController.checkDuplicateAndSave);

module.exports = router;
