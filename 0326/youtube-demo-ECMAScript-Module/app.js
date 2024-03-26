// ECMAScript 모듈 (ES)
// - 공식적인 자바스크립트 모듈 형식
// - 표준이 나오기전에 사용한 것이 commonJS (점점 ES 사용이 늘고 있지만 commonJS를 많이 쓰긴함)
// - 브라우저에서도 ES 모듈을 사용할 수 있어 브라우저와 노드 모두 같은 형식을 사용할 수 있다는 장점이 있음
// - 사용하려면 package.json에  "type": "module" 추가해야 함

// 실행 : npm start

import express from 'express';
import userRouter from './routes/users.js';
import channelRouter from './routes/channels.js';

const app = express();

app.use(express.json());

app.use('/', userRouter);
app.use('/channels', channelRouter);

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
