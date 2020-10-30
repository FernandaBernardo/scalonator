const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("interview", InterviewSchema);