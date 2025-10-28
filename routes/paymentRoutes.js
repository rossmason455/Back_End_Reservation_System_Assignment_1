const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middlewares/authMiddleware");

/* ************************************** PAY FOR A BOOKING ************************************** */
router.post("/:bookingId/pay", authMiddleware, paymentController.createPayment);

/* ************************************** GET PAYMENT BY BOOKING ************************************** */
router.get("/:bookingId", authMiddleware, paymentController.getPaymentByBooking);

/* ************************************** GET ALL PAYMENTS (ADMIN ONLY) ************************************** */
router.get("/", authMiddleware, paymentController.getAllPayments);

module.exports = router;