const mongoose = require('mongoose');

const doctorProfileSchema = new mongoose.Schema({
  my_sql_resource_id: {
    type: Number,   
    required: true,
    unique: true
  },
  biography: {
    type: String,
    required: true,
    trim: true
  },
  languages: {
    type: [String], 
    default: []
  },
  education: {
    type: [String], 
    default: []
  },
  reviews: {
    type: [String], 
    default: []
  }
}, { timestamps: true });

const DoctorProfile = mongoose.model('DoctorProfile', doctorProfileSchema);

module.exports = DoctorProfile;