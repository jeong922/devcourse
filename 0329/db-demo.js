const mysql = require('mysql2');
const { config } = require('./config');

// Create the connection to database
// https://sidorares.github.io/node-mysql2/docs/examples/connections/create-connection#connectionoptions
// 민감한 정보는 코드에 바로 쓰면 안되기 때문에 env파일에 저장해 뒀음.
// https://github.com/motdotla/dotenv?tab=readme-ov-file#readme
const connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port,
  dateStrings: true, // Force date types (TIMESTAMP, DATETIME, DATE) to be returned as strings rather then inflated into JavaScript Date
});

// A simple SELECT query
// connection.query('SELECT * FROM `users`', (err, results, fields) => {
//   console.log(results);
//   const { id, name, email, created_at } = results[0];
//   console.log(id, name, email, created_at);
// });

module.exports.connection = connection;
