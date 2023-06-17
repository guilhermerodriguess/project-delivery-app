require('dotenv').config();

const environment = process.env.NODE_ENV || 'test';

const suffix = {
  prod: '',
  production: '',
  dev: '-dev',
  development: '-dev',
  test: '-test',
};

const options = {
  host: process.env.HOSTNAME || process.env.MYSQL_HOST || 's-cdbr-east-06.cleardb.net',
  port: process.env.MYSQL_PORT || '3306',
  database: 
    `${process.env.MYSQL_DB_NAME || 'heroku_199c82e4d4a79e1'}${suffix[environment] || suffix.test}`,
  username: process.env.MYSQL_USER || 'b7fe5ca8e345e5',
  password: process.env.MYSQL_PASSWORD || '063657c4',
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
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};

mysql://b7fe5ca8e345e5:063657c4@us-cdbr-east-06.cleardb.net/heroku_199c82e4d4a79e1?reconnect=true