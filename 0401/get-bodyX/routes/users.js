const express = require('express');
const conn = require('../db/mariaDB');
const router = express.Router();

router.use(express.json());

router.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';

  conn.execute(sql, (_err, results) => {
    res.status(200).json(results);
  });
});

router.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const sql = 'SELECT * FROM users WHERE id = ?';
  conn.execute(sql, [id], (_err, results) => {
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

router.post('/join', (req, res) => {
  let { name, email, password, contact } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: '입력 값을 다시 확인해주세요.' });
  }

  name = name.trim();
  email = email.trim();
  password = password.trim();

  if (name === '' || email === '' || password === '') {
    return res.status(400).json({ message: '입력 값을 다시 확인해주세요.' });
  }

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

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: '입력 값을 다시 확인해주세요.' });
  }

  const sql = 'SELECT * FROM users WHERE email=?';

  conn.execute(sql, [email], (_err, results) => {
    const user = results[0];
    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
    }

    res.status(200).json({ message: `${user.name}님 환영합니다.` });
  });
});

router.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sql = 'DELETE FROM users WHERE id = ?';

  conn.execute(sql, [id], (err, results) => {
    if (!results.affectedRows) {
      return res.status(404).json({
        message: `존재하지 않는 사용자 입니다.`,
      });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
