const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const AppointmentNote = require('../mongodb_models/appointmentNote');
const DoctorProfile = require('../mongodb_models/doctorProfile');
const PatientProfile = require('../mongodb_models/patientProfile');

async function seedAppointmentNotes() {
  try {
   await mongoose.connect('mongodb+srv://n00230645_db_user:cHH09IOEsM7mTs3l@reservationmongodb.ef34u6s.mongodb.net/reservation_mongodb?retryWrites=true&w=majority&appName=reservationmongodb');



    await AppointmentNote.deleteMany({});


    const doctors = await DoctorProfile.find();
    const patients = await PatientProfile.find();


    const notes = [];
    for (let i = 1; i <= 20; i++) {
      notes.push({
        my_sql_resource_id: i, 
        doctor_id: faker.helpers.arrayElement(doctors),
        user_id: faker.helpers.arrayElement(patients),
        notes: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
          content: faker.lorem.sentence(),
          created_at: faker.date.recent() 
        })),
        attachments: Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => ({
          file_name: faker.system.commonFileName(),
          uploaded_at: faker.date.recent(),
          file_type: faker.system.mimeType()
        })),
        tags: faker.helpers.arrayElements(['cardiology', 'pediatrics', 'follow-up', 'checkup', 'neurology', 'orthopedics'], faker.number.int({ min: 0, max: 2 })),
        status: faker.helpers.arrayElement(['draft', 'finalized', 'archived'])
      });
    }

    await AppointmentNote.insertMany(notes);
    console.log('AppointmentNotes seeded');

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seedAppointmentNotes();
