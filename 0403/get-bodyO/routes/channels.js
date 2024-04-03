const express = require('express');
const conn = require('../db/mariaDB');
const { body, param } = require('express-validator');
const { validate } = require('../middleware/validator');

const router = express.Router();

const validateUserId = [
  body('userId')
    .notEmpty()
    .isInt()
    .withMessage('userId를 숫자로 입력해주세요.'),
  validate,
];

// ❗ validateUerId이걸 다시 쓰고 싶어서 아래와 같이 작성했는데 validate는 꼭 배열 마지막으로 와야 정상적으로 동작한다.
const validateUserIdAndTitle = [
  body('title')
    .trim()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage('채널명을 한글자 이상 정확하게 입력해주세요.'),
  ...validateUserId,
];

const validateId = [
  param('id')
    .notEmpty()
    .isInt()
    .withMessage('채널 id를 숫자로 정확하게 입력해주세요.'),
  validate,
];

const validateIdAndTitle = [
  body('title')
    .trim()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage('채널명을 한글자 이상 정확하게 입력해주세요.'),
  ...validateId,
];

router.get('/', validateUserId, (req, res) => {
  const { userId } = req.body;
  const sql = 'SELECT * FROM channels WHERE user_id = ?';
  conn.execute(sql, [userId], (err, results) => {
    if (err) {
      return res.sendStatus(400);
    }
    const user = results;
    if (!user.length) {
      return notFound(res);
    }
    res.status(200).json(user);
  });
});

router.get('/:id', validateId, (req, res) => {
  const id = parseInt(req.params.id);
  const sql = 'SELECT * FROM channels WHERE id = ?';
  conn.execute(sql, [id], (err, results) => {
    if (err) {
      return res.sendStatus(400);
    }

    const channel = results[0];
    if (!channel) {
      return notFound(res);
    }
    res.status(200).json(channel);
  });
});

router.post('/', validateUserIdAndTitle, (req, res) => {
  let { userId, title } = req.body;
  userId = parseInt(userId);
  const sql = 'INSERT INTO channels (title, user_id) VALUES(?, ?)';
  const values = [title, userId];
  conn.execute(sql, values, (err, results) => {
    if (err) {
      return res.sendStatus(400);
    }
    res.status(201).json(results);
  });
});

router.put('/:id', validateIdAndTitle, (req, res) => {
  const id = parseInt(req.params.id);
  const title = req.body.title;

  const sql = 'UPDATE channels SET title=? WHERE id=?';
  const values = [title, id];

  conn.execute(sql, values, (err, results) => {
    if (err) {
      return res.sendStatus(400);
    }

    if (!results.affectedRows) {
      return notFound(res);
    }
    res.status(200).json({
      message: `채널명이 ${title}로 변경되었습니다. `,
    });
  });
});

router.delete('/:id', validateId, (req, res) => {
  const id = parseInt(req.params.id);
  const sql = 'DELETE FROM channels WHERE id = ?';

  conn.execute(sql, [id], (err, results) => {
    if (err) {
      return res.sendStatus(400);
    }

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
