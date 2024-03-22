const express = require('express');
const app = express();
app.use(express.json());

const db = new Map();

// 테스트용 데이터
db.set(1, { id: 1, username: '춘식', userId: 'choonsik', password: '12345' });
db.set(2, { id: 2, username: '어피치', userId: 'apeach', password: '123454' });

// route 사용
// app
//   .route('/users/:id')
//   .get((req, res) => {
//     const id = parseInt(req.params.id);

//     if (!db.has(id)) {
//       return res.status(404).json({
//         message: '존재하지 않는 회원 입니다.',
//       });
//     }

//     const user = db.get(id);
//     res.status(200).json({ username: user.username, userId: user.userId });
//   })
//   .delete((req, res) => {
//     const id = parseInt(req.params.id);

//     if (!db.has(id)) {
//       return res.status(404).json({
//         message: `요청하신 id ${id}번은 없는 사용자 입니다.`,
//       });
//     }
//     const username = db.get(id).username;
//     db.delete(id);
//     res.status(200).json({ message: `${username}님 다음에 또 뵙겠습니다.` });
//     // res.sendStatus(204);
//   });

// GET /users/:id
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (!db.has(id)) {
    return res.status(404).json({
      message: '존재하지 않는 회원 입니다.',
    });
  }

  const user = db.get(id);
  res.status(200).json({ username: user.username, userId: user.userId });
});

// POST /join
app.post('/join', (req, res) => {
  // 검증하는 방법으로 express-validator를 사용하는 방법도 있음
  // https://express-validator.github.io/docs/

  const MAX_BODY_LENGTH = 3; // 받는 데이터의 양에 따라 값 변경해야 함
  const { username, userId, password } = req.body;
  const bodyLength = Object.values(req.body).length;
  if (bodyLength != MAX_BODY_LENGTH) {
    return res.status(400).json({ message: '입력 값을 다시 확인해주세요.' });
  }
  const user = {
    id: Date.now(),
    username: username.trim(),
    userId: userId.trim(),
    password: password.trim(), // 비밀번호 검증 추가하기(정규표현식 뭐 이런거..)
  };
  const findUser = [...db.values()].find(
    (user) => user.userId === userId.trim()
  );
  if (findUser) {
    res.status(409).json({ message: '이미 가입 된 사용자 입니다.' });
  } else {
    db.set(user.id, user);
    res.status(201).json({ message: `${user.username}님 환영합니다.` });
  }
});

// POST /login
app.post('/login', (req, res) => {
  // 토큰이 없어서 다음과 같이 구현
  // userId와 일치하는 유저가 없거나 아이디나 비밀번호가 일치하지 않는 경우 확인
  const { userId, password } = req.body;
  const findUser = [...db.values()].find((user) => user.userId === userId);
  // 로그인 실패 시 너무 많은 정보를 제공하면 안된다고 배워서
  // "아이디 또는 비밀번호가 틀렸습니다."라고만 메세지 전달
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

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (!db.has(id)) {
    return res.status(404).json({
      message: `요청하신 id ${id}번은 없는 사용자 입니다.`,
    });
  }
  const username = db.get(id).username;
  db.delete(id);
  res.status(200).json({ message: `${username}님 다음에 또 뵙겠습니다.` });
  // res.sendStatus(204);
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
