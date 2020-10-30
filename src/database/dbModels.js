const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const InterviewSchema = new Schema({
  type: {
    type: String,
    required: true
  }
});


let interview = mongoose.model("interview", InterviewSchema);


module.exports = {
  interview
}