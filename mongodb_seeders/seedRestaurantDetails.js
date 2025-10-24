const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const RestaurantDetail = require('../mongodb_models/restaurantDetail');

async function seedRestaurantDetails() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    await RestaurantDetail.deleteMany({});

    const restaurants = [];
    for (let i = 21; i <= 40; i++) {
      restaurants.push({
        my_sql_resource_id: i,
        menu: faker.helpers.arrayElements(['Pizza', 'Burger', 'Pasta', 'Salad'], faker.number.int({ min: 1, max: 3 })),
        photos: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.image.food()),
        faqs: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => faker.lorem.sentence())
      });
    }

    await RestaurantDetail.insertMany(restaurants);
    console.log('RestaurantDetails seeded');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seedRestaurantDetails();
