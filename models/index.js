"use strict";
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);

const db = {};

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
  const dbHost = process.env.DB_HOST || config.host || "127.0.0.1";
  const dbName = process.env.DB_NAME || config.database;
  const dbUser = process.env.DB_USER || config.username;
  const dbPass =
    process.env.DB_PASS !== undefined
      ? process.env.DB_PASS
      : config.password || "";
  const dbPort = process.env.DB_PORT || config.port || 3306;
  const dbDialect = process.env.DB_DIALECT || config.dialect || "mysql";

  sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: dbDialect,
    logging: config.logging || false,
  });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.connectSequelize = async (retries = 5, delay = 2000) => {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log("Sequelize connected to DB");
      return;
    } catch (err) {
      console.log(
        `Sequelize connection failed, retrying in ${delay}ms... (${retries} retries left)`
      );
      retries -= 1;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error(
    "Unable to connect to Sequelize database after multiple retries"
  );
};

module.exports = db;
