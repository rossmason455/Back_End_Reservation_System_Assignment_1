const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

/*************************************** CREATE BOOKING ROUTE **************************************/

router.post("/create", authMiddleware, bookingController.createBooking);

/* ************************************** GET USER BOOKINGS ************************************** */
router.get("/", authMiddleware, bookingController.getUserBookings);

/* ************************************** GET USER BOOKING ************************************** */
router.get("/:id", authMiddleware, bookingController.getBookingById);

/* ************************************** UPDATE BOOKING STATUS ************************************** */
router.patch("/:id", authMiddleware, bookingController.updateBookingStatus);

module.exports = router;
