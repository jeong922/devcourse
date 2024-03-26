const express = require('express');
const router = express.Router();

router.use(express.json());

const db = new Map();

// 테스트용 데이터
// 강의에서는 id 값을 제거 했지만 id를 살려두고 구현할때 db 조회 할때 id 대신 userId를 사용하는 형태로 구현함
db.set('choonsik', {
  id: 1,
  username: '춘식',
  userId: 'choonsik',
  password: '12345',
});
db.set('apeach', {
  id: 2,
  username: '어피치',
  userId: 'apeach',
  password: '123454',
});

// user 전체 조회 GET /users
router.get('/users', (req, res) => {
  res.json([...db.values()]);
});

// GET /users -> 개별 조회
// ❓ GET에는 안되는건 아니지만 body를 사용을 권장하지 않는다고함.
// 이걸 쓰려면 위에 전체조회 코드 주석처리 해야함 -> 아래 코드로 전체조회도 하려면 코드 수정 필요
// router.get('/users', (req, res) => {
//   const { userId } = req.body;

//   db.has(userId)
//     ? res.status(200).json(db.get(userId))
//     : res.status(404).json({
//         message: '회원 정보가 없습니다.',
//       });
// });

// GET /users/:userId
// id 값을 대신 userId를 사용하면서 body에서 userId 값을 받아와 그것으로 db 데이터를 삭제하는데
// userId 값 자체가 유니크한(중복없는) 값이므로 그냥 req.params.userId로 받아와서 사용해도 된다고 생각함.
router.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  if (!db.has(userId)) {
    return res.status(404).json({
      message: '존재하지 않는 회원 입니다.',
    });
  }

  const user = db.get(userId);
  res.status(200).json({ username: user.username, userId: user.userId });
});

// POST /join
router.post('/join', (req, res) => {
  const MAX_BODY_LENGTH = 3; // 받는 데이터의 양에 따라 값 변경해야 함
  let { username, userId, password } = req.body;
  const bodyLength = Object.keys(req.body).length;
  if (bodyLength != MAX_BODY_LENGTH) {
    return res.status(400).json({ message: '입력 값을 다시 확인해주세요.' });
  }

  username = username.trim();
  userId = userId.trim();
  password = password.trim();

  if (username === '' || userId === '' || password === '') {
    return res.status(400).json({ message: '입력 값을 다시 확인해주세요.' });
  }

  const user = {
    id: Date.now(),
    username,
    userId,
    password,
  };

  const findUser = [...db.values()].find((user) => user.userId === userId);
  if (findUser) {
    res.status(409).json({ message: '이미 가입 된 사용자 입니다.' });
  } else {
    db.set(user.userId, user);
    res.status(201).json({ message: `${user.username}님 환영합니다.` });
  }
});

// POST /login
router.post('/login', (req, res) => {
  const { userId, password } = req.body;
  const findUser = [...db.values()].find((user) => user.userId === userId);
  if (
    !findUser ||
    findUser.userId !== userId ||
    findUser.password !== password
  ) {
    return res
      .status(401)
      .json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
  }

  res.status(200).json({ message: `${findUser.username}님 환영합니다.` });
});

// DELETE /users
// ❓ DELETE에는 안되는건 아닌데 body 사용을 권장하지 않는 것 같음
// router.delete('/users', (req, res) => {
//   const { userId } = req.body;
//   if (!db.has(userId)) {
//     return res.status(404).json({
//       message: `요청하신 ${userId}은(는) 없는 사용자 입니다.`,
//     });
//   }

//   const username = db.get(userId).username;
//   db.delete(userId);
//   res.status(200).json({ message: `${username}님 다음에 또 뵙겠습니다.` });
// });

// DELETE /users/:userId
// id 값을 대신 userId를 사용하면서 body에서 userId 값을 받아와 그것으로 db 데이터를 삭제하는데
// userId 값 자체가 유니크한(중복없는) 값이므로 그냥 req.params.userId로 받아와서 사용해도 된다고 생각함.
router.delete('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  if (!db.has(userId)) {
    return res.status(404).json({
      message: `요청하신 ${userId}은(는) 없는 사용자 입니다.`,
    });
  }
  const username = db.get(userId).username;
  db.delete(userId);
  res.status(200).json({ message: `${username}님 다음에 또 뵙겠습니다.` });
});

module.exports = router;
