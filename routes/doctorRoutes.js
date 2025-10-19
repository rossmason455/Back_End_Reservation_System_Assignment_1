const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const doctorController = require("../controllers/doctorController");
const authMiddleware = require("../middlewares/authMiddleware");


/*************************************** CREATE PROFILE ROUTE **************************************/

router.post(
  "/doctorProfile",
  authMiddleware,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("specialization").notEmpty().withMessage("Specialization is required"),
    body("clinicName").notEmpty().withMessage("Clinic name is required"),
    body("biography").notEmpty().withMessage("Biography is required"),
    body("languages").isArray().withMessage("Languages must be an array"),
    body("education").isArray().withMessage("Education must be an array")
  ],
  doctorController.createProfile
);

/*************************************** UPDATE PROFILE ROUTE **************************************/

router.put(
  "/doctorProfile",
  authMiddleware,
  [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("specialization").optional().notEmpty(),
    body("clinicName").optional().notEmpty(),
  ],
  doctorController.updateProfile
);

module.exports = router;
