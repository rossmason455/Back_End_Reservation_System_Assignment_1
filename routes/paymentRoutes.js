const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/:bookingId/pay", authMiddleware, paymentController.createPayment);

router.get("/:bookingId", authMiddleware, paymentController.getPaymentByBooking);

module.exports = router;