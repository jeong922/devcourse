// process.env를 바로 쓰지 않고 다음과 같이 만든 이유
// 예전에 node.js 강의에서 배웠는데
// 이렇게 쓰면 값이 정의 된 것인지 아닌지 확인 가능하고 사용하는 곳에서도 사용하기 편함
const dotenv = require('dotenv');

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;

  if (value == null) {
    throw new Error(`${key}는 없음`);
  }

  return value;
}

const config = {
  db: {
    host: required('DB_HOST'),
    user: required('DB_USER'),
    password: required('DB_PASSWORD'),
    database: required('BD_DATABASE'),
    port: parseInt(required('BD_PORT')),
  },
};

module.exports.config = config;
