const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  studentName: {
    type: String,
    required: true,
  },
  eventRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  feedbackComments: {
    type: String,
    required: true,
  },
  suggestions: {
    type: String,
  },
  favoritePart: {
    type: String,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
