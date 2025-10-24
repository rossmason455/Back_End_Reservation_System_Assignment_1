const mongoose = require('mongoose');

const bookingLogSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  my_sql_booking_id: Number,
  resource_id: Number,        
  action: String,            
  timestamp: { type: Date, default: Date.now },
  metadata: mongoose.Schema.Types.Mixed 
}, { timestamps: true });

const BookingLog = mongoose.model('BookingLog', bookingLogSchema);
module.exports = BookingLog;
