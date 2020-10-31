const candidate = require('./dbModels').candidate;

let candidateDAO = {
  addCandidate: async function(data) {
    await candidate.create({name: data.name, slot: data.slot, speciality: data.speciality });
  },

  deleteCandidate: async function(id) {
    await candidate.findOneAndRemove({ _id: id });
  },

  allCandidates: async function() {
    return await candidate.find().populate('speciality');
  }
}

module.exports = candidateDAO;