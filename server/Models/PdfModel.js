const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  pdfData: {
    type: Buffer,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  }
});

const Pdf = mongoose.model('Pdf', pdfSchema);

module.exports = Pdf;
