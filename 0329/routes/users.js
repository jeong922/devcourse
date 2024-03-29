const express = require('express');
const { db } = require('../db/database');
const router = express.Router();

router.use(express.json());

// GET /users
router.get('/users', async (req, res) => {
  db.execute('SELECT * FROM users').then((result) => {
    const data = result[0];
    res.status(200).json(data);
  });
});

router.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  db.execute('SELECT * FROM users WHERE id=?', [id]).then((result) => {
    const data = result[0][0];
    if (!data) {
      return res.status(404).json({ message: '존재하지 않는 회원입니다.' });
    }
    res.status(200).json(data);
  });
});

// POST /join
router.post('/join', async (req, res) => {
  const { name, email, password, contact } = req.body;
  if (!name || !password || !email) {
    return res.status(400).json({ message: '입력 값을 다시 확인해주세요.' });
  }

  db.execute(
    'INSERT INTO users (name, email, password, contact) VALUES(?,?,?,?)',
    [name, email, password, contact]
  )
    .then((result) => {
      res.status(201).json({ message: `${name}님 환영합니다.` });
    })
    .catch((err) => {
      if (err.errno === 1062) {
        return res.status(409).json({ message: '이미 가입 된 사용자 입니다.' });
      }
    });
});

// POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  db.execute('SELECT * FROM users WHERE email=? AND password=?', [
    email,
    password,
  ])
    .then((result) => {
      const user = result[0][0];
      if (!user) {
        return res
          .status(401)
          .json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
      }

      res.status(200).json({ message: `${user.name}님 환영합니다.` });
    })
    .catch((err) => {
      return res.status(400).json({ message: '입력 값을 다시 확인해주세요.' });
    });
});

router.delete('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await getUserById(id);
  if (!user) {
    return res.status(404).json({
      message: `요청하신 ${id}는 없는 사용자 입니다.`,
    });
  }

  db.execute(`DELETE FROM users WHERE id=?`, [id]).then((result) => {
    return res
      .status(200)
      .json({ message: `${user.name}님 다음에 또 뵙겠습니다.` });
  });
});

async function getUserById(id) {
  return db
    .execute('SELECT * FROM users WHERE id=?', [id]) //
    .then((result) => result[0][0]);
}

module.exports = router;
