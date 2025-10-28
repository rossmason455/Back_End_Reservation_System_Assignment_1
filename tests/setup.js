const { sequelize } = require("../models");
const mongoose = require("mongoose");

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await mongoose.connect(process.env.MONGO_URL_TEST);
});

afterAll(async () => {
  await sequelize.close();

  await mongoose.connection.close();
});
