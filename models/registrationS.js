const mongoose = require("mongoose");
const { Schema } = mongoose;

const registrationSchema = new Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
    // Add email validation if needed
  },
  studentNumber: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[0-9]+$/.test(value),
      message: "Student number should be a number!",
    },
  },
  eventSelection: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

const RegistrationS = mongoose.model("Registration", registrationSchema);

module.exports = RegistrationS;
