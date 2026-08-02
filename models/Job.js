const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    interviewDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Interview Scheduled",
        "Rejected",
        "Selected",
        "Offer Received",
      ],
      default: "Applied",
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);