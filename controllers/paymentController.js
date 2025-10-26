const { Payment, Booking, Resource } = require("../models");



function calculateAmount(booking) {
  const resourceType = booking.Resource?.type;

  if (!resourceType) {
    throw new Error("Resource type is missing for booking");
  }

  let amount;

  switch (resourceType.toLowerCase()) {
    case 'doctor':
      amount = 150.0;
      break;
    case 'restaurant table':
      amount = 80.0;
      break;
    case 'meeting room':
      amount = 120.0;
      break;
    default:
      throw new Error(`Unknown resource type: ${resourceType}`);
  }

  return amount;
}




/* ****************************************************************************************** */
/* ************************************* CREATE PAYMENT FOR CONFIRMED BOOKING *************** */
/* ****************************************************************************************** */

exports.createPayment = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const booking = await Booking.findByPk(bookingId, { include: [Resource] });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    
    if (booking.status !== "confirmed") {
      return res.status(400).json({ message: "Cannot pay for unconfirmed booking" });
    }

    
    if (userRole !== "admin" && booking.user_id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    
    const existingPayment = await Payment.findOne({ where: { booking_id: bookingId } });
    if (existingPayment) {
      return res.status(400).json({ message: "Payment already exists for this booking" });
    }


    const amount = calculateAmount(booking);

    const payment = await Payment.create({
      booking_id: booking.id,
      amount,
      status: "pending",
      payment_date: new Date()
    });

    res.status(201).json({ message: "Payment created", payment });
  } catch (err) {
    console.error("CREATE PAYMENT ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */


/* ****************************************************************************************** */
/* ************************************* GET PAYMENT BY BOOKING ***************************** */
/* ****************************************************************************************** */

exports.getPaymentByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    
    const booking = await Booking.findByPk(bookingId, { include: [Resource] });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    
    if (userRole !== "admin" && booking.user_id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

   
    const payment = await Payment.findOne({
      where: { booking_id: bookingId },
      include: [{ model: Booking, include: [Resource] }]
    });

    if (!payment) {
      return res.status(404).json({ message: "No payment found for this booking" });
    }

    res.status(200).json({
      message: "Payment retrieved successfully",
      payment
    });
  } catch (err) {
    console.error("GET PAYMENT ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */


/* ****************************************************************************************** */
/* ************************************* GET ALL PAYMENTS (ADMIN) *************************** */
/* ****************************************************************************************** */




/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */