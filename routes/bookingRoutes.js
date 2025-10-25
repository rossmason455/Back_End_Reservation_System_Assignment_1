const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, bookingController.createBooking);

router.get("/", authMiddleware, bookingController.getUserBookings);

router.get("/:id", authMiddleware, bookingController.getBookingById);

router.put("/:id", authMiddleware, bookingController.updateBookingStatus);

module.exports = router;