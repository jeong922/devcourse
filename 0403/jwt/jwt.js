// jwt(JSON Web Token) - JSON 형식이 데이터 저장하는 토큰
// HEADER : 토큰 종류와 해시 알고리즘 정보
// PAYLOAD : 토큰의 내용물이 인코딩된 부분
// SIGNATURE : 토큰이 변조 되었는지 확인
// 비밀번호 같은건 넣지말것

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.JWT_PRIVATE_KEY;

const token = jwt.sign({ email: 'test@email.com' }, secret);
console.log(token);

const decoded = jwt.verify(token, secret);
console.log(decoded);

// jwt.verify(token, 'keyyyy', (error, decoded) => {
//   console.log(error, decoded);
// }); // JsonWebTokenError: invalid signature

// ❓ 토근 만료 시간을 줘보자
// 2초뒤 만료 설정
const tokenWithExpiresIn = jwt.sign({ email: 'test@email.com' }, secret, {
  expiresIn: '2s',
});

const decoded1 = jwt.verify(tokenWithExpiresIn, secret);
console.log(decoded1); // { email: 'test@email.com', iat: 발급 시점(number), exp: 만료 시간(number) }

setTimeout(() => {
  jwt.verify(tokenWithExpiresIn, secret, (error, decoded) => {
    console.log(error, decoded);
  });
}, 4000);
// 토큰이 만료되어 4초 뒤에 TokenExpiredError: jwt expired가 뜬다

console.log(tokenWithExpiresIn); // undefined
