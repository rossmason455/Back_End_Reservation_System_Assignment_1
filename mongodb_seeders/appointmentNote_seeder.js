const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const AppointmentNote = require('../models/appointmentNote');
const DoctorProfile = require('../models/doctorProfile');
const PatientProfile = require('../models/patientProfile');

async function seedAppointmentNotes() {
  try {
    await mongoose.connect('mongodb://localhost:27017/your_db_name', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');


    await AppointmentNote.deleteMany({});


    const doctors = await DoctorProfile.find();
    const patients = await PatientProfile.find();

    if (!doctors.length || !patients.length) {
      console.log('No doctors or patients found. Seed them first!');
      mongoose.connection.close();
      return;
    }


    const notes = [];
    for (let i = 1; i <= 20; i++) {
      notes.push({
        my_sql_resource_id: i, 
        doctor_id: faker.helpers.arrayElement(doctors),
        user_id: faker.helpers.arrayElement(patients),
        notes: Array.from({ length: faker.datatype.number({ min: 1, max: 3 }) }, () => ({
          content: faker.lorem.sentence(),
          created_at: faker.date.recent() 
        })),
        attachments: Array.from({ length: faker.datatype.number({ min: 0, max: 2 }) }, () => ({
          file_name: faker.system.fileName(),
          uploaded_at: faker.date.recent(),
          file_type: faker.system.mimeType()
        })),
        tags: faker.helpers.arrayElements(['cardiology', 'pediatrics', 'follow-up', 'checkup', 'neurology', 'orthopedics'], faker.datatype.number({ min: 0, max: 2 })),
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
