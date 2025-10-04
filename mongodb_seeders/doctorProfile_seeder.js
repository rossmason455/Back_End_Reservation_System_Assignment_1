const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const DoctorProfile = require('../mongodb_models/doctorProfile');

async function seedDoctors() {


  try{  await mongoose.connect('mongodb+srv://n00230645_db_user:cHH09IOEsM7mTs3l@reservationmongodb.ef34u6s.mongodb.net/reservation_mongodb?retryWrites=true&w=majority&appName=reservationmongodb');

  await DoctorProfile.deleteMany({});

  const doctors = [];
  for (let i = 1; i <= 20; i++) {
    doctors.push({
      my_sql_resource_id: i,
      biography: faker.lorem.paragraph(),
      languages: faker.helpers.arrayElements(['English', 'Spanish', 'French', 'German'], faker.number.int({ min: 1, max: 3 })),
      education: [`${faker.person.jobTitle()} - ${faker.company.name()}`],
      reviews: []
    });
  }

  await DoctorProfile.insertMany(doctors);
  console.log('DoctorProfiles seeded');
  mongoose.connection.close();
}


   catch (err) {
     console.error(err);
     mongoose.connection.close();
   }
}

seedDoctors();
