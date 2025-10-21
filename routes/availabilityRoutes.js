const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const availabilityController = require("../controllers/availabilityController");
const authMiddleware = require("../middlewares/authMiddleware");



/*************************************** CREATE TIME SLOT ROUTE **************************************/

router.post(
  "/availability",
  authMiddleware,
  [
    body("available_date")
      .notEmpty()
      .withMessage("Available date is required")
      .isISO8601()
      .withMessage("Invalid date format"),
    body("start_time")
      .notEmpty()
      .withMessage("Start time is required")
      .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
      .withMessage("Start time must be in HH:mm format"),
    body("end_time")
      .notEmpty()
      .withMessage("End time is required")
      .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
      .withMessage("End time must be in HH:mm format"),
  ],
  availabilityController.createSlot
);

module.exports = router;