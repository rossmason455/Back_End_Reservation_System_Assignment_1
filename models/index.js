'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;


if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else if (process.env.DATABASE_URL) {

  sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
  const dbHost = process.env.DB_HOST || config.host || '127.0.0.1';
  const dbName = process.env.DB_NAME || config.database;
  const dbUser = process.env.DB_USER || config.username;
  const dbPass = process.env.DB_PASS !== undefined ? process.env.DB_PASS : config.password;
  const dbPort = process.env.DB_PORT || config.port || 3306;
  const dbDialect = process.env.DB_DIALECT || config.dialect || 'mysql';

  sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: dbDialect,
    logging: config.logging || false,
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
