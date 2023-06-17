require('dotenv').config();

const options = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  database: process.env.DB_NAME || 'delivery-app',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  [process.env.NODE_ENV || 'development']: options,
};
