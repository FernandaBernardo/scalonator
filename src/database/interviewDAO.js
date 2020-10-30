const interview = require('./dbModels').interview;

let interviewDAO = {
  addInterview: async function(data) {
    await interview.create({type: data});
  },

  deleteInterview: async function(id) {
    await interview.findOneAndRemove({ _id: id });
  },

  allInterviews: async function() {
    return await interview.find();
  }
}

module.exports = interviewDAO;