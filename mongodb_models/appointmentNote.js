const mongoose = require('mongoose');

const appointmentNoteSchema = new mongoose.Schema({
  my_sql_resource_id: {
    type: Number,      
    required: true,
    unique: true
  
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,   
    ref: 'DoctorProfile',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,   
    ref: 'User',
    required: true
  },
  notes: [
    {
      content: { type: String, required: true, trim: true },
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date }
    }
  ]
}, { timestamps: true });

const appointmentNote = mongoose.model('appointmentNote', appointmentNoteSchema);

module.exports = appointmentNote;