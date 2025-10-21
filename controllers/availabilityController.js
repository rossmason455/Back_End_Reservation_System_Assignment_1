const { Availability, Doctor } = require("../models");
const { Op } = require("sequelize");



/* ****************************************************************************************** */
/* ************************************* CREATE TIME SLOT *********************************** */
/* ****************************************************************************************** */
exports.createSlot = async (req, res) => {
  try {

    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Only doctors can create time slots." });
    }

    
    const { available_date, start_time, end_time } = req.body;

    
    if (!available_date || !start_time || !end_time) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const doctor = await Doctor.findOne({ where: { user_id: req.user.id } });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found." });
    }

      const doctorId = doctor.id;

    const start = new Date(`${available_date}T${start_time}`);
    const end = new Date(`${available_date}T${end_time}`);

    if (start >= end) return res.status(400).json({ message: "Start time must be before end time." });
    if (start < new Date()) return res.status(400).json({ message: "Cannot create slots in the past." });

    
    const overlap = await Availability.findOne({
      where: {
        doctor_id: doctorId,
        start_datetime: { [Op.lt]: end },
        end_datetime: { [Op.gt]: start }
      }
    });
    if (overlap) return res.status(400).json({ message: "Time slot overlaps with existing slot." });

    const slot = await Availability.create({
      doctor_id: doctorId,
      available_date,
      start_datetime: start,
      end_datetime: end,
      status: "available"
    });

    res.status(201).json({ message: "Slot created successfully.", slot });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */


/* ****************************************************************************************** */
/* ************************************* UPDATE TIME SLOT *********************************** */
/* ****************************************************************************************** */

exports.updateSlot = async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Only doctors can update slots" });
    }

    const { slotId } = req.params;
    const { available_date, start_time, end_time } = req.body;

    if (!available_date && !start_time && !end_time) {
      return res.status(400).json({ message: "At least one field must be provided for update" });
    }

    const doctor = await Doctor.findOne({ where: { user_id: req.user.id } });
    if (!doctor) return res.status(404).json({ message: "Doctor profile not found" });

    const slot = await Availability.findOne({
      where: { id: slotId, doctor_id: doctor.id }
    });
    if (!slot) return res.status(404).json({ message: "Slot not found" });

    
    let start = slot.start_datetime;
    let end = slot.end_datetime;
    if (available_date || start_time || end_time) {
      start = new Date(`${available_date || slot.available_date}T${start_time || start.getHours().toString().padStart(2,'0')}:${start.getMinutes().toString().padStart(2,'0')}:00`);
      end = new Date(`${available_date || slot.available_date}T${end_time || end.getHours().toString().padStart(2,'0')}:${end.getMinutes().toString().padStart(2,'0')}:00`);

      if (start >= end) return res.status(400).json({ message: "Start time must be before end time." });

    
      const overlap = await Availability.findOne({
        where: {
          doctor_id: doctor.id,
          id: { [Op.ne]: slot.id },
          start_datetime: { [Op.lt]: end },
          end_datetime: { [Op.gt]: start }
        }
      });
      if (overlap) return res.status(400).json({ message: "Time slot overlaps with existing slot." });
    }

    slot.available_date = available_date || slot.available_date;
    slot.start_datetime = start;
    slot.end_datetime = end;

    await slot.save();

    res.status(200).json({ message: "Slot updated successfully", slot });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */