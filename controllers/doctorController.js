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

    const { name, specialization, clinicName, biography, languages, education } = req.body;

    const doctor = await Doctor.findOne({ where: { user_id: req.user.id } });
    if (!doctor) return res.status(404).json({ message: "Doctor profile not found" });

    let clinic_id = doctor.clinic_id;
    if (clinicName) {
      const clinic = await Clinic.findOne({
        where: { clinic_name: clinicName },
      });
      if (!clinic) return res.status(404).json({ message: "Clinic not found" });
      clinic_id = clinic.id;
    }

    await doctor.update({
      name: name || doctor.name,
      specialization: specialization || doctor.specialization,
      clinic_id,
    });

    console.log("Searching MongoDB with my_sql_resource_id:", doctor.id);
console.log("Type of doctor.id:", typeof doctor.id);

     const mongoProfile = await DoctorProfile.findOne({ my_sql_resource_id: Number(doctor.id) });
    if (!mongoProfile)
      return res.status(404).json({ message: "MongoDB doctor profile not found" });

    if (biography) mongoProfile.biography = biography;
    if (languages) mongoProfile.languages = Array.isArray(languages) ? languages : languages.split(",").map(l => l.trim());
    if (education) mongoProfile.education = Array.isArray(education) ? education : education.split(",").map(e => e.trim());

    await mongoProfile.save();

    res.status(200).json({ message: "Doctor profile updated in both SQL and MongoDB", 
        doctor, 
        mongoProfile 
    });
  
    } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */