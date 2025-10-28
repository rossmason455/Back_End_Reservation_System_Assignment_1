const mongoose = require("mongoose");

const doctorDetailSchema = new mongoose.Schema(
  {
    my_sql_resource_id: {
      type: Number,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      required: true,
    },
    specializations: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const DoctorDetail =
  mongoose.models.DoctorDetail ||
  mongoose.model("DoctorDetail", doctorDetailSchema);

module.exports = DoctorDetail;
