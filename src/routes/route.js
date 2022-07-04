const express = require("express");

const {
  createCollege,
  getDetails,
} = require("../controllers/collegeController");

const { createIntern } = require("../controllers/internController");
const router = express.Router();

// college APIs
router.post("/functionup/colleges", createCollege);
router.get("/functionup/collegeDetails", getDetails);

// intern API
router.post("/functionup/interns", createIntern);

module.exports = router;
