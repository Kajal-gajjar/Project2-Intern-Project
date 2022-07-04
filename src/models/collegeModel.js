const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "College name is required",
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: "Full name of college is required",
    trim: true,
  },
  logoLink: { type: String, required: "Logo link is required", trim: true },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("College", collegeSchema);
