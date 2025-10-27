const mongoose = require('mongoose');
const RestaurantDetail = require('../mongodb_models/restaurantDetail');

async function seedRestaurantDetails() {

  const { faker } = await import('@faker-js/faker');
  try {
        await mongoose.connect(
      "mongodb+srv://n00230645_db_user:cHH09IOEsM7mTs3l@reservationmongodb.ef34u6s.mongodb.net/reservation_mongodb?retryWrites=true&w=majority&appName=reservationmongodb",
      { useNewUrlParser: true, useUnifiedTopology: true });

    await RestaurantDetail.deleteMany({});

    const restaurants = [];
    for (let i = 21; i <= 40; i++) {
      restaurants.push({
        my_sql_resource_id: i,
        menu: faker.helpers.arrayElements([ 'Pizza',
    'Burger',
    'Pasta',
    'Salad',
    'Steak',
    'Sushi',
    'Tacos',
    'Curry',
    'Sandwich',
    'Fried Chicken',
    'Seafood Platter',
    'Vegan Bowl',
    'BBQ Ribs',
    'Soup of the Day',
    'Wraps',
    'Ice Cream',
    'Cheesecake',
    'Pancakes',
    'Smoothie',
    'Coffee',
    'Tea'], faker.number.int({ min: 1, max: 3 })),
        photos: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.image.url({ width: 640, height: 480, category: 'food' })),
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
