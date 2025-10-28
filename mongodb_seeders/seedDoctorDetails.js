const mongoose = require("mongoose");

const DoctorDetail = require("../mongodb_models/doctorDetail");

async function seedDoctorDetails() {
  const { faker } = await import("@faker-js/faker");
  try {
    await mongoose.connect(
      "mongodb+srv://n00230645_db_user:cHH09IOEsM7mTs3l@reservationmongodb.ef34u6s.mongodb.net/reservation_mongodb?retryWrites=true&w=majority&appName=reservationmongodb",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    await DoctorDetail.deleteMany({});

    const doctors = [];
    for (let i = 1; i <= 20; i++) {
      doctors.push({
        my_sql_resource_id: i,
        bio: faker.lorem.paragraph(),
        specializations: faker.helpers.arrayElements(
          [
            "Cardiology",
            "Pediatrics",
            "Neurology",
            "Orthopedics",
            "Dermatology",
            "Psychiatry",
            "Oncology",
            "Gastroenterology",
            "Endocrinology",
            "Ophthalmology",
            "Urology",
            "Gynecology",
            "Pulmonology",
            "Rheumatology",
            "Nephrology",
            "Hematology",
            "Allergy and Immunology",
            "Emergency Medicine",
            "General Surgery",
            "Internal Medicine",
            "Radiology",
            "Anesthesiology",
            "Pathology",
            "Dentistry",
          ],
          faker.number.int({ min: 1, max: 3 })
        ),
        photos: Array.from(
          { length: faker.number.int({ min: 1, max: 3 }) },
          () => faker.image.avatar()
        ),
        faqs: Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () =>
          faker.lorem.sentence()
        ),
      });
    }

    await DoctorDetail.insertMany(doctors);
    console.log("DoctorDetails seeded");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seedDoctorDetails();
