const mongoose = require('mongoose');

const restaurantDetailSchema = new mongoose.Schema({
  my_sql_resource_id: {
    type: Number,
    required: true,
    unique: true
  },
  menu: {
    type: [String],
    default: []
  },
  photos: {
    type: [String],
    default: []
  },
  faqs: {
    type: [String],
    default: []
  }
}, { timestamps: true });

const RestaurantDetail = mongoose.model('RestaurantDetail', restaurantDetailSchema);
module.exports = RestaurantDetail;
