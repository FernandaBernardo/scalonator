const interview = require('../models/interview');

let interviewDAO = {
  addInterview: async function(data) {
    await interview.create({type: data});
  },

  deleteInterview: async function(id) {
    await interview.findOneAndDelete();
  },

  allInterviews: async function() {
    return await interview.find();
  }
}

module.exports = interviewDAO;