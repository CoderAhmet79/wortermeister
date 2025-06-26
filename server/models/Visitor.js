
const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: String,
  language: String,
  screenSize: String,
  userAgent: String,
  referrer: String,
  currentUrl: String,
  timestamp: Date,
});

module.exports = mongoose.model('trackingInfo', visitorSchema);
