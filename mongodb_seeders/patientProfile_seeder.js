const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const PatientProfile = require('../models/patientProfile');

async function seedPatients() {
  try {
    await mongoose.connect('mongodb://localhost:27017/your_db_name', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');

    
    await PatientProfile.deleteMany({});

    
    const patients = [];
    for (let i = 1; i <= 15; i++) {
      patients.push({
        my_sql_resource_id: i, 
        medical_history: faker.helpers.arrayElements(
          ['Asthma',
  'Diabetes',
  'Hypertension',
  'Heart disease',
  'Allergy to penicillin',
  'Allergy to nuts',
  'Allergy to pollen',
  'Migraine',
  'Arthritis',
  'Chronic back pain',
  'Depression',
  'Anxiety',
  'High cholesterol',
  'Obesity',
  'Sleep apnea',
  'COPD',
  'Kidney disease',
  'Thyroid disorder',
  'Gastroesophageal reflux',
  'IBS',
  'Cancer',
  'Skin condition',
  'Vitamin D deficiency',
  'Osteoporosis',
  'Glaucoma'], 
          faker.datatype.number({ min: 0, max: 3 })
        ),
        uploaded_documents: Array.from({ length: faker.datatype.number({ min: 0, max: 3 }) }, () => faker.system.fileName()),
        notes: Array.from({ length: faker.datatype.number({ min: 0, max: 2 }) }, () => faker.lorem.sentence())
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
