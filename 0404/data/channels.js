const conn = require('../db/mariaDB');

async function getChannelByUserId(userId) {
  const sql = 'SELECT * FROM channels WHERE user_id = ?';
  return await conn
    .promise()
    .execute(sql, [userId])
    .then((result) => result[0])
    .catch((err) => {
      // ❗ 에러처리 방법 생각해보기
      console.log(err);
    });
}

async function getChannelById(id) {
  const sql = 'SELECT * FROM channels WHERE id = ?';

  return await conn
    .promise()
    .execute(sql, [id])
    .then((result) => result[0][0])
    .catch((err) => {
      // ❗ 에러처리 방법 생각해보기
      console.log(err);
    });
}

async function createChannel(userId, title) {
  const sql = 'INSERT INTO channels (title, user_id) VALUES(?, ?)';
  const values = [title, userId];
  return await conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      // ❗ 에러처리 방법 생각해보기
      console.log(err);
    });
}

async function updateChannel(id, title) {
  const sql = 'UPDATE channels SET title=? WHERE id=?';
  const values = [title, id];
  return await conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      // ❗ 에러처리 방법 생각해보기
      console.log(err);
    });
}

async function deleteChannel(id) {
  const sql = 'DELETE FROM channels WHERE id = ?';

  return await conn
    .promise()
    .execute(sql, [id])
    .then((result) => result[0])
    .catch((err) => {
      // ❗ 에러처리 방법 생각해보기
      console.log(err);
    });
}

const channelData = {
  getChannelByUserId,
  getChannelById,
  createChannel,
  updateChannel,
  deleteChannel,
};

module.exports = channelData;
