const { sequelize } = require("../models");
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  await sequelize.sync({ force: true });

await mongoose.connect(process.env.MONGO_URL_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await sequelize.close();

  await mongoose.connection.close();
});
