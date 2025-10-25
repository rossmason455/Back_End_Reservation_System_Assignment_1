const { Booking, Resource } = require("../models");
const { Op } = require("sequelize");

/* ****************************************************************************************** */
/* ************************************* CREATE BOOKING ************************************* */
/* ****************************************************************************************** */

exports.createBooking = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { resource_id, booking_date, start_time, end_time } = req.body;

    
    const resource = await Resource.findByPk(resource_id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    
    if (resource.status !== "available") {
      return res.status(400).json({ message: "Resource is not available for booking" });
    }

    
    const overlapping = await Booking.findOne({
      where: {
        resource_id,
        booking_date,
        start_time: { [Op.lt]: end_time },
        end_time: { [Op.gt]: start_time },
        status: ["pending", "confirmed"] 
      }
    });

    if (overlapping) {
      return res.status(400).json({ message: "Resource is already booked for this time slot" });
    }

    
    const booking = await Booking.create({
      user_id: userId,
      resource_id,
      booking_date,
      start_time,
      end_time,
      status: "pending" 
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking
    });

  } catch (err) {
    console.error("CREATE BOOKING ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */