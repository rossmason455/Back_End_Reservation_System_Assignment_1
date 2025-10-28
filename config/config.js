const host = process.env.DB_HOST || 'localhost';

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": host, 
    "dialect": "mysql",
    "define": {
      "engine": "InnoDB", 
      "charset": "utf8mb4",
      "collate": "utf8mb4_unicode_ci",
      "underscored": true,
      "freezeTableName": true 
    }
    
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "logging": false,
    "define": {
     "underscored": true,
    "freezeTableName": true,
    }
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": host, 
    "dialect": "mysql"
  }
};
