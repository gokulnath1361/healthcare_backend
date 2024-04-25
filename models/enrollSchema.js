const mongoose = require('mongoose');

const enrollSchema = new mongoose.Schema({
  hospital_name: {
    type: String,
    required: true,
    unique: true,
  },
  doctor_name: {
    type: String,
    required: true,
  },
  treatments:  {
    type: String,
    required: true,
  },
  feedback:  {
    type: String,
    required: true,
  },
  address:  {
    type: String || Number,
    required: true,
  },
  email:  {
    type: String,
    required: true,
  },
  contact:  {
    type: Number,
    required: true,
  },

});

module.exports = mongoose.model('Enroll', enrollSchema);
