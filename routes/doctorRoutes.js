const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const doctorController = require("../controllers/doctorController");
const authMiddleware = require("../middlewares/authMiddleware");


router.post(
  "/doctorProfile",
  authMiddleware,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("specialization").notEmpty().withMessage("Specialization is required"),
    body("clinicName").notEmpty().withMessage("Clinic name is required")
  ],
  doctorController.createProfile
);

module.exports = router;
