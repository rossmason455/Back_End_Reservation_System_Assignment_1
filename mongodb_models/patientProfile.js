const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema({
  my_sql_resource_id: {
    type: Number,   
    required: true,
    unique: true
  },
  medical_history: {
    type: [String],     
    default: []
  },
   uploaded_documents: [
    {
      file_name: { type: String, required: true },
      uploaded_at: { type: Date, required: true }
    }
  ],
  notes: [
    {
      doctor_id: {
        type: Number,    
        required: true
      },
      note: { type: String, required: true },
      date: { type: Date, required: true }
    }
  ]
}, { timestamps: true });

const patientProfile = mongoose.model('PatientProfile', patientProfileSchema);

module.exports = patientProfile;