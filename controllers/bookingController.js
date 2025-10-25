const { Booking, Resource } = require("../models");
const { Op } = require("sequelize");
const DoctorDetail = require("../mongodb_models/doctorDetail");
const RestaurantDetail = require("../mongodb_models/restaurantDetail");
const MeetingRoomDetail = require("../mongodb_models/meetingRoomDetail");

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


/* ****************************************************************************************** */
/* ************************************* GET ALL USER BOOKINGS ****************************** */
/* ****************************************************************************************** */


exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id; 

    
    const bookings = await Booking.findAll({
      where: { user_id: userId },
      include: [{ model: Resource }],
      order: [["booking_date", "ASC"], ["start_time", "ASC"]],
    });

    
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        const resource = booking.Resource; 
        let mongoDetail = null;

        if (resource.type === "doctor") {
          mongoDetail = await DoctorDetail.findOne({ my_sql_resource_id: resource.id });
        } else if (resource.type === "restaurant table") {
          mongoDetail = await RestaurantDetail.findOne({ my_sql_resource_id: resource.id });
        } else if (resource.type === "meeting room") {
          mongoDetail = await MeetingRoomDetail.findOne({ my_sql_resource_id: resource.id });
        }

        return {
          id: booking.id,
          booking_date: booking.booking_date,
          start_time: booking.start_time,
          end_time: booking.end_time,
          status: booking.status,
          resource: {
            id: resource.id,
            name: resource.name,
            type: resource.type,
            status: resource.status,
            details: mongoDetail || null,
          },
        };
      })
    );

    res.status(200).json(bookingsWithDetails);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */