const express = require('express');
const router = express.Router();
const conn = require('../db/mariaDB');
const { param, body } = require('express-validator');
const { validate } = require('../middleware/validator');

const validateUserId = [
  param('userId').notEmpty().isInt().withMessage('숫자로 입력해주세요.'),
  validate,
];

const validateUserIdAndTitle = [
  body('title')
    .trim()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage('채널명을 한글자 이상 정확하게 입력해주세요.'),
  body('userId')
    .notEmpty()
    .isInt()
    .withMessage('userId를 숫자로 입력해주세요.'),
  validate,
];

const validateId = [
  param('id')
    .notEmpty()
    .isInt()
    .withMessage('채널 id를 숫자로 정확하게 입력해주세요.'),
  validate,
];

const validateIdAndUserId = [
  param('userId')
    .notEmpty()
    .isInt()
    .withMessage('숫자로 정확하게 입력해주세요.'),
  ...validateId,
];

const validateIdAndTitle = [
  body('title')
    .trim()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage('채널명을 한글자 이상 정확하게 입력해주세요.'),
  ...validateId,
];

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM channels';
  conn.execute(sql, (err, results) => {
    if (err) {
      return res.sendStatus(400);
    }
    res.status(200).json(results);
  });
});

router.get('/:userId', validateUserId, (req, res) => {
  const userId = parseInt(req.params.userId);

  const sql = 'SELECT * FROM channels WHERE user_id = ?';
  conn.execute(sql, [userId], (err, results) => {
    if (err) {
      return res.sendStatus(400);
    }
    const channels = results;
    if (!channels.length) {
      return notFound(res);
    }
    res.status(200).json(channels);
  });
});

router.get('/:userId/:id', validateIdAndUserId, (req, res) => {
  let { userId, id } = req.params;
  id = parseInt(id);
  userId = parseInt(userId);
  const sql = 'SELECT * FROM channels WHERE user_id = ? AND id = ?';
  const values = [userId, id];

  conn.execute(sql, values, (err, results) => {
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

    if (!results.affectedRows) {
      return notFound(res);
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
      message: `채널명이 '${title}'로 변경되었습니다. `,
    });
  });
});

router.delete('/:userId/:id', validateIdAndUserId, (req, res) => {
  let { userId, id } = req.params;
  id = parseInt(id);
  userId = parseInt(userId);

  const sql = 'DELETE FROM channels WHERE user_id=? AND id=?';
  const values = [userId, id];
  conn.execute(sql, values, (err, results) => {
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
