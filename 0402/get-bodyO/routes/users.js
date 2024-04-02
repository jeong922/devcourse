const express = require('express');
const conn = require('../db/mariaDB');
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');

const router = express.Router();

const validateEmail = [
  body('email')
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage('유효하지 않은 이메일 입니다.'),
  validate,
];

// isStrongPassword라는게 있긴하던데 그냥 최소 길이만 설정함
// trim을 사용해서 그런지 password를 숫자로 입력해도 정상적으로 문자열로 들어감.
const validateEmailAndPassword = [
  body('password')
    .notEmpty()
    .trim()
    .isLength({ min: 4 })
    .withMessage('비밀번호는 4글자 이상 입력해야 합니다.'),
  ...validateEmail,
];

const validateJoin = [
  body('name')
    .notEmpty()
    .trim()
    .isLength({ min: 2 })
    .withMessage('이름을 입력해주세요.'),
  body('contact').trim(),
  ...validateEmailAndPassword,
];

router.get('/users', validateEmail, (req, res) => {
  const { email } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  conn.execute(sql, [email], (err, results) => {
    if (err) {
      return res.sendStatus(400);
    }

    const user = results[0];
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: '회원 정보가 없습니다.',
      });
    }
  });
});

router.post('/join', validateJoin, (req, res) => {
  const { name, email, password, contact } = req.body;
  const sql =
    'INSERT INTO users (name, email, password, contact) VALUES(?, ?, ?, ?)';
  const values = [name, email, password, contact];

  conn.execute(sql, values, (err, results) => {
    if (err?.errno === 1062) {
      return res.status(409).json({ message: '이미 가입 된 사용자 입니다.' });
    }
    res.status(201).json(results);
  });
});

router.post('/login', validateEmailAndPassword, (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email=?';

  conn.execute(sql, [email], (err, results) => {
    if (err) {
      return res.sendStatus(400);
    }
    const user = results[0];
    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
    }

    res.status(200).json({ message: `${user.name}님 환영합니다.` });
  });
});

router.delete('/users', validateEmail, (req, res) => {
  const { email } = req.body;
  const sql = 'DELETE FROM users WHERE email = ?';

  conn.execute(sql, [email], (err, results) => {
    if (err) {
      return res.sendStatus(400);
    }

    if (!results.affectedRows) {
      return res.status(404).json({
        message: `존재하지 않는 사용자 입니다.`,
      });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
