const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const MeetingRoomDetail = require('../mongodb_models/meetingRoomDetail');

async function seedMeetingRoomDetails() {
  try {
        await mongoose.connect(
      "mongodb+srv://n00230645_db_user:cHH09IOEsM7mTs3l@reservationmongodb.ef34u6s.mongodb.net/reservation_mongodb?retryWrites=true&w=majority&appName=reservationmongodb",
      { useNewUrlParser: true, useUnifiedTopology: true });

    await MeetingRoomDetail.deleteMany({});

    const rooms = [];
    for (let i = 41; i <= 60; i++) {
      rooms.push({
        my_sql_resource_id: i,
        capacity: faker.number.int({ min: 2, max: 50 }),
        amenities: faker.helpers.arrayElements(['Projector','Whiteboard','Wifi','Conference Phone'], faker.number.int({ min: 1, max: 4 })),
        photos: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.image.url({ width: 640, height: 480, category: 'business' }))
      });
    }

    await MeetingRoomDetail.insertMany(rooms);
    console.log('MeetingRoomDetails seeded');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seedMeetingRoomDetails();