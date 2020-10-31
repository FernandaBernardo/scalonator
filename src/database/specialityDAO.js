const speciality = require('./dbModels').speciality;

let specialityDAO = {
  addSpeciality: async function(data) {
    await speciality.create({type: data.type, interviews: data.interviews });
  },

  deleteSpeciality: async function(id) {
    await speciality.findOneAndRemove({ _id: id });
  },

  allSpecialities: async function() {
    return await speciality.find().populate('interviews');
  }
}

module.exports = specialityDAO;