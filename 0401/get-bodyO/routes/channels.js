const express = require('express');
const router = express.Router();
const conn = require('../db/mariaDB');

router.use(express.json());

router.get('/', (req, res) => {
  const { userId } = req.body;
  const sql = 'SELECT * FROM channels WHERE user_id = ?';
  conn.execute(sql, [userId], (_err, results) => {
    const user = results;
    if (!user.length) {
      return notFound(res);
    }
    res.status(200).json(user);
  });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sql = 'SELECT * FROM channels WHERE id = ?';

  conn.execute(sql, [id], (err, results) => {
    const channel = results[0];
    if (channel) {
      res.status(200).json(channel);
    } else {
      notFound(res);
    }
  });
});

router.post('/', (req, res) => {
  const { userId, title } = req.body;

  if (!userId || !title) {
    return res.status(400).json({ message: '정확한 값을 입력해 주세요.' });
  }

  if (typeof userId !== 'number' || title === '') {
    return res.status(400).json({ message: '정확한 값을 입력해 주세요.' });
  }

  const sql = 'INSERT INTO channels (title, user_id) VALUES(?, ?)';
  const values = [title, userId];

  conn.execute(sql, values, (err, results) => {
    res.status(201).json(results);
  });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const title = req.body.title;

  if (!title || title === '') {
    return res.status(400).json({ message: '정확한 값을 입력해 주세요.' });
  }

  const sql = 'UPDATE channels SET title=? WHERE id=?';
  const values = [title, id];

  conn.execute(sql, values, (err, results) => {
    if (!results.affectedRows) {
      return notFound(res);
    }
    res.status(200).json({
      message: `채널명이 ${title}로 변경되었습니다. `,
    });
  });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sql = 'DELETE FROM channels WHERE id = ?';

  conn.execute(sql, [id], (err, results) => {
    if (!results.affectedRows) {
      return notFound(res);
    }
    res.status(200).json(results);
  });
});

function notFound(res, message = '채널 정보를 찾을 수 없습니다.') {
  res.status(404).json({ message });
}

module.exports = router;
