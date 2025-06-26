// models/Phrase.js
const mongoose = require("mongoose");

const phraseSchema = new mongoose.Schema({
  phraseDeutsch: { type: String, required: true },
  phraseTurkish: { type: String, required: true },
  level: { type: String, required: true }
});

module.exports = mongoose.model("phrases", phraseSchema);
