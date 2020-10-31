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

const CandidateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slot: {
    type: String,
    required: true
  },
  speciality: {
    type: Schema.Types.ObjectId,
    ref: 'speciality',
    required: true
  }
});


let interview = mongoose.model("interview", InterviewSchema);
let speciality = mongoose.model("speciality", SpecialitySchema);
let candidate = mongoose.model("candidate", CandidateSchema);

module.exports = {
  interview, speciality, candidate
}