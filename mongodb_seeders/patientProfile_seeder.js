const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const PatientProfile = require('../mongodb_models/patientProfile');

async function seedPatients() {
  try {
   await mongoose.connect('mongodb+srv://n00230645_db_user:cHH09IOEsM7mTs3l@reservationmongodb.ef34u6s.mongodb.net/reservation_mongodb?retryWrites=true&w=majority&appName=reservationmongodb');

    
    await PatientProfile.deleteMany({});

    
 const patients = [];
    for (let i = 1; i <= 20; i++) {
      patients.push({
        my_sql_resource_id: i,
        name: faker.person.fullName(),
        age: faker.number.int({ min: 1, max: 100 }),
        gender: faker.person.sex(),
        uploaded_documents: [
          {
            file_name: faker.system.commonFileName(),
            uploaded_at: faker.date.recent()
          },
          {
            file_name: faker.system.commonFileName(),
            uploaded_at: faker.date.recent()
          }
        ],
        notes: [
  {
    date: faker.date.recent(),
    note: faker.lorem.sentence(),
    doctor_id: faker.number.int({ min: 1, max: 20 })
  },
  {
    date: faker.date.recent(),
    note: faker.lorem.sentence(),
    doctor_id: faker.number.int({ min: 1, max: 20 })
  }
]
      });
    }
    await PatientProfile.insertMany(patients);
    console.log('PatientProfiles seeded');

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seedPatients();
