//individual.js(Model File)
const mongoose = require('mongoose');

const individualSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  // Add other fields as needed
});

const Individual = mongoose.model('Individual', individualSchema);

module.exports = Individual;