const express = require("express");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { User } = require("../models");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/* ****************************************************************************************** */
/* ************************************* REGISTER USER ************************************** */
/* ****************************************************************************************** */

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */

/* ****************************************************************************************** */
/* ************************************** LOGIN USER **************************************** */
/* ****************************************************************************************** */

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */

/* ****************************************************************************************** */
/* ************************************** LOGOUT USER *************************************** */
/* ****************************************************************************************** */

/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */
