const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const InterviewSchema = new Schema({
  type: {
    type: String,
    required: true
  }
});

const SpecialitySchema = new Schema({
  type: {
    type: String,
    required: true
  },
  interviews: [{
    type: Schema.Types.ObjectId,
    ref: 'interview',
    required: true
  }]
});


let interview = mongoose.model("interview", InterviewSchema);
let speciality = mongoose.model("speciality", SpecialitySchema);


module.exports = {
  interview, speciality
}