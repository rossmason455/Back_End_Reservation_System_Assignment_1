const mongoose = require('mongoose');

const meetingRoomDetailSchema = new mongoose.Schema({
  my_sql_resource_id: {
    type: Number,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
  amenities: {
    type: [String],
    default: []
  }
}, { timestamps: true });

const MeetingRoomDetail = mongoose.model('MeetingRoomDetail', meetingRoomDetailSchema);
module.exports = MeetingRoomDetail;
