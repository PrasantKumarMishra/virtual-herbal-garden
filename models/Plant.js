const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
});

module.exports = mongoose.model("Plant", plantSchema);
