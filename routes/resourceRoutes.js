const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");
const authMiddleware = require("../middlewares/authMiddleware");



/* ************************************** GET SINGLE RESOURCE ************************************** */

router.get("/:id", authMiddleware, resourceController.getResourceById);

module.exports = router;