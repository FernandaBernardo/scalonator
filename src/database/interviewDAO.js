const client = require('./redis-client');

let interviewDAO = {
  addInterview: function(interview) {
    return new Promise((resolve, reject) => {
      client.sadd(['interviews', interview], function(err, reply) {
        resolve();
      });
    });
  },

  deleteInterview: function(interview) {
    return new Promise((resolve, reject) => {
      client.srem(['interviews', interview], function(err, reply) {
        resolve();
      });
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