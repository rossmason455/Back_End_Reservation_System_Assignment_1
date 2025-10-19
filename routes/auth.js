const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");



/*************************************** REGISTER ROUTE **************************************/

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("phone")
      .notEmpty()
      .withMessage("Phone is required")
      .isMobilePhone()
      .withMessage("Valid phone number is required"),
  ],
  authController.register
);

/* ************************************** LOGIN ROUTE ****************************************/
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  authController.login
);


/* ************************************** LOGOUT ROUTE ****************************************/

router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
