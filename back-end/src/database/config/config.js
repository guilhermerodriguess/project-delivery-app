require('dotenv').config();

const environment = process.env.NODE_ENV;

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
};

const options = {
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  database: 
    `${process.env.MYSQLDATABASE || 'delivery-app'}${suffix[environment]}`,
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  production: {
    ...options,
  },
};