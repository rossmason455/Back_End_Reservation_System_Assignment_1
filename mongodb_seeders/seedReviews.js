const mongoose = require('mongoose');
const Review = require('../mongodb_models/review');
const { User } = require('../models');

async function seedReviews() {

  const { faker } = await import('@faker-js/faker');
  try {
        await mongoose.connect(
      "mongodb+srv://n00230645_db_user:cHH09IOEsM7mTs3l@reservationmongodb.ef34u6s.mongodb.net/reservation_mongodb?retryWrites=true&w=majority&appName=reservationmongodb",
      { useNewUrlParser: true, useUnifiedTopology: true });

    const users = await User.findAll();
    const userIds = users.map(user => user.id);

    const reviews = [];

    for (let resourceId = 1; resourceId <= 120; resourceId++) {
      const numReviews = 2 + Math.floor(Math.random() * 2); 

      for (let i = 0; i < numReviews; i++) {
        reviews.push({
          my_sql_resource_id: resourceId,
          user_id: faker.helpers.arrayElement(userIds),
          rating: faker.number.int({ min: 1, max: 5 }),
          comment: faker.lorem.sentence(),
          created_at: faker.date.recent(),
          updated_at: new Date()
        });
      }
    }

    await Review.insertMany(reviews);
    console.log('Reviews seeded');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seedReviews();
