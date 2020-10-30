const mongoose = require("mongoose");
const db = require("./config");

let database = () => {
  mongoose.connect(db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = database;