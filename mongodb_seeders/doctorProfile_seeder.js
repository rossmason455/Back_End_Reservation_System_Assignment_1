const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const DoctorProfile = require('../mongodb_models/doctorProfile');

async function seedDoctors() {
  await mongoose.connect('mongodb://localhost:27017/reservationmongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await DoctorProfile.deleteMany({});

  const doctors = [];
  for (let i = 1; i <= 20; i++) {
    doctors.push({
      my_sql_resource_id: i,
      biography: faker.lorem.paragraph(),
      languages: faker.helpers.arrayElements(['English', 'Spanish', 'French', 'German'], faker.datatype.number({ min: 1, max: 3 })),
      education: [`${faker.name.jobTitle()} - ${faker.company.companyName()}`],
      reviews: []
    });
  }

  await DoctorProfile.insertMany(doctors);
  console.log('DoctorProfiles seeded');
  mongoose.connection.close();
}

seedDoctors();
