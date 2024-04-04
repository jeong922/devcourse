const jwt = require('jsonwebtoken');
const userData = require('../data/users');
const { config } = require('../config');

// ❓ 에러처리를 하고 싶은데 db에서 데이터를 가져오는 data/users의 함수에서 해야하는지
// 아니면 여기서 해야하는지 생각해볼것.
async function getUser(req, res) {
  const { email } = req.body;
  const user = await userData.findUser(email);

  if (!user) {
    return res.status(404).json({
      message: '회원 정보가 없습니다.',
    });
  }
  res.status(200).json(user);
}

async function join(req, res) {
  const { name, email, password, contact } = req.body;
  const find = await userData.findUser(email);

  // 이렇게 파일을 나눴을 경우 에러처리 방법을 모르겠어서
  // 일단 email과 일치하는 회원정보가 있다면 아래와 같이 처리함
  if (find) {
    return res.status(409).json({ message: '이미 가입 된 사용자 입니다.' });
  }

  const user = await userData.createUser(name, email, password, contact);
  res.status(201).json({ name, email, contact });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await userData.findUser(email);

  if (!user || user.password !== password) {
    return res
      .status(401)
      .json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
  }

  const token = createJwtToken(email);

  // ❓ 쿠키 -> 근데 이거말고 다른방법은 없는지 생각해보자..
  res.cookie('token', token, { httpOnly: true });

  res.status(200).json({ message: `${user.name}님 환영합니다.` });

  // ✅ 오늘 강의 내용이라 남겨둔거
  // const sql = 'SELECT * FROM users WHERE email=?';
  // conn.execute(sql, [email], (err, results) => {
  //   if (err) {
  //     return res.sendStatus(400);
  //   }
  //   const user = results[0];
  //   if (!user || user.password !== password) {
  //     return res
  //       .status(401)
  //       .json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
  //   }

  //   const token = createJwtToken(email);

  //   res.cookie('token', token, { httpOnly: true });

  //   res.status(200).json({ message: `${user.name}님 환영합니다.`, token });
  // });
}

async function removeUser(req, res) {
  const { email } = req.body;

  const result = await userData.deleteUser(email);

  if (!result.affectedRows) {
    return res.status(404).json({
      message: `존재하지 않는 사용자 입니다.`,
    });
  }
  res.status(200).json({ message: '정상적으로 탈퇴 처리 되었습니다' });
}

function createJwtToken(email) {
  return jwt.sign({ email }, config.jwt.privateKey, {
    expiresIn: '30m',
    issuer: 'jeong',
  });
}

const userController = {
  getUser,
  join,
  login,
  removeUser,
};

module.exports = userController;
