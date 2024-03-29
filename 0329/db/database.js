const mysql = require('mysql2');
const { config } = require('../config');

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port,
  dateStrings: true,
});

const db = pool.promise();

module.exports.db = db;
