const conn = require('../db/mariaDB');

async function findUser(email) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  return await conn
    .promise()
    .execute(sql, [email])
    .then((result) => result[0][0])
    .catch((err) => {
      // ❗ 에러처리 방법 생각해보기
      console.log(err);
    });
}

async function createUser(name, email, password, contact) {
  const sql =
    'INSERT INTO users (name, email, password, contact) VALUES(?, ?, ?, ?)';
  const values = [name, email, password, contact];

  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result)
    .catch((err) => {
      // ❗ 에러처리 방법 생각해보기
      console.log(err);
    });
}

async function deleteUser(email) {
  const sql = 'DELETE FROM users WHERE email = ?';

  return conn
    .promise()
    .execute(sql, [email])
    .then((results) => results[0])
    .catch((err) => {
      // ❗ 에러처리 방법 생각해보기
      console.log(err);
    });
}

const userData = {
  findUser,
  createUser,
  deleteUser,
};

module.exports = userData;
