const mysql = require('mysql2');
const { config } = require('../config');

const conn = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port,
  dateStrings: true,
});

module.exports = conn;
