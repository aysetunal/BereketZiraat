const mongoose = require('mongoose');

const teklifSchema = new mongoose.Schema({
  ad:        { type: String, required: true },
  telefon:   { type: String },
  email:     { type: String },
  gubreTuru: { type: String },
  mesaj:     { type: String },
  okundu:    { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Teklif', teklifSchema);
