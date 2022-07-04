const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({
  name: { type: String, required: "Name is required", trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(
          v
        );
      },
      message: "Please enter a valid email",
    },
  },
  mobile: {
    type: Number,
    required: "Mobile number is required",
    unique: true,
    trim: true,
    validate: {
      validator: function (num) {
        return /^[6789]\d{9}$/.test(num);
      },
      message: "Please enter a valid Indian mobile number",
    },
  },
  collegeId: { type: objectId, ref: "college" },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Intern", internSchema);
