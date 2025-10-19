const { Doctor, Clinic } = require("../models");

exports.createProfile = async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Only doctor users can create a profile" });
    }

    const { name, specialization, clinicName } = req.body;

    const clinic = await Clinic.findOne({ where: { clinic_name: clinicName } });
    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }

    const doctorProfile = await Doctor.create({
      user_id: req.user.id,
      name,
      specialization,
      clinic_id: clinic.id,
    });

    res.status(201).json({ message: "Doctor profile created", doctorProfile });
  } catch (err) {
    console.error("CREATE PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
