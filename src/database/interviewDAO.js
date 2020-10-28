const client = require('./redis-client');

let interviewDAO = {
  addInterview: function(interview) {
    return new Promise((resolve, reject) => {
      client.sadd(['interviews', interview], function(err, reply) {
        resolve();
      });
    });
  },

  editInterview: function(oldInterview, newInterview) {
    return new Promise((resolve, reject) => {

    });
  },

  allInterviews: function() {
    return new Promise((resolve, reject) => {
      client.smembers('interviews', function (err, object) {
        resolve(object);
      });
    });
  }
}

module.exports = interviewDAO;