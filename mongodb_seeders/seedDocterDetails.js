const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const DoctorDetail = require('../mongodb_models/doctorDetail');

async function seedDoctorDetails() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    await DoctorDetail.deleteMany({});

    const doctors = [];
    for (let i = 1; i <= 20; i++) {
      doctors.push({
        my_sql_resource_id: i,
        bio: faker.lorem.paragraph(),
        specializations: faker.helpers.arrayElements(
          ['cardiology', 'pediatrics', 'neurology', 'orthopedics'], 
          faker.number.int({ min: 1, max: 3 })
        ),
        photos: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.image.avatar()),
        faqs: Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => faker.lorem.sentence())
      });
    }

    await DoctorDetail.insertMany(doctors);
    console.log('DoctorDetails seeded');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seedDoctorDetails();
