const dotenv = require('dotenv');

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;

  if (value == null) {
    throw new Error(`${key}는 없음`);
  }

  return value;
}

const config = {
  db: {
    host: required('DB_HOST'),
    user: required('DB_USER'),
    password: required('DB_PASSWORD'),
    database: required('BD_DATABASE'),
    port: parseInt(required('BD_PORT')),
  },
};

module.exports.config = config;
