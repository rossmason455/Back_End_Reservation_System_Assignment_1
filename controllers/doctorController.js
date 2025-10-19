const { Doctor, Clinic } = require("../models");
const DoctorProfile = require("../mongodb_models/DoctorProfile");

/* ****************************************************************************************** */
/* ************************************** CREATE PROFILE ************************************ */
/* ****************************************************************************************** */

exports.createProfile = async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Only doctor users can create a profile" });
    }

    const { name, specialization, clinicName, biography, languages, education  } = req.body;

    const clinic = await Clinic.findOne({ where: { clinic_name: clinicName } });
    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

     const doctor = await Doctor.create({
      user_id: req.user.id,
      name,
      specialization,
      clinic_id: clinic.id,
    });

    const doctorProfile = new DoctorProfile({
      my_sql_resource_id: doctor.id,
      biography,
      languages,
      education,
      reviews: []
    });

        await doctorProfile.save();

    res.status(201).json({ message: "Doctor profile created in both SQL and MongoDB",doctor, doctorProfile });
  } catch (err) {
    console.error("CREATE PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */


/* ****************************************************************************************** */
/* ************************************** UPDATE PROFILE ************************************ */
/* ****************************************************************************************** */

exports.updateProfile = async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Only doctor users can update profiles" });
    }

    const { name, specialization, clinicName } = req.body;

    const doctorProfile = await Doctor.findOne({
      where: { user_id: req.user.id },
    });
    if (!doctorProfile) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    let clinic_id = doctorProfile.clinic_id;
    if (clinicName) {
      const clinic = await Clinic.findOne({
        where: { clinic_name: clinicName },
      });
      if (!clinic) return res.status(404).json({ message: "Clinic not found" });
      clinic_id = clinic.id;
    }

    await doctorProfile.update({
      name: name || doctorProfile.name,
      specialization: specialization || doctorProfile.specialization,
      clinic_id,
    });

    res.status(200).json({ message: "Doctor profile updated", doctorProfile });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */