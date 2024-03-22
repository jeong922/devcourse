const express = require('express');
const app = express();

app.use(express.json());

const db = new Map();

const youtubers = [
  {
    id: 1,
    channelTitle: 'T1Keria',
    sub: '28.3만명',
    videoNum: '95개',
  },
  {
    id: 2,
    channelTitle: 'SKTT1',
    sub: '126만명',
    videoNum: '2.9천개',
  },
  {
    id: 3,
    channelTitle: 'T1_Faker',
    sub: '185만명',
    videoNum: '1.3천개',
  },
];

youtubers.forEach((v, i) => db.set(i + 1, v)); // 요구사항이 Map을 사용해야 하는 것 같은데 반복해서 set 하기 귀찮아서 걍 forEach 돌림

// GET /youtubers
app.get('/youtubers', (req, res) => {
  // 1. forEach 돌려서 object에 값 저장
  // 근데 이렇게만 하면 결국은 GET 했을때 object로 반환됨
  // youtubers를 배열로 만들고 id값을 따로 저장해준다면 상관없을듯
  // const youtubers = {};
  // db.forEach((youtuber, key) => {
  //   youtubers[key] = youtuber;
  // });
  // res.json(youtubers);
  //
  // 1-2. forEach 돌려서 배열에 값 저장
  // const youtubers = [];
  // db.forEach((v) => youtubers.push(v));
  // res.json(youtubers);
  //
  // 2. spread syntax
  // 배열이나 문자열과 같이 반복 가능한 문자를 0개 이상의 인수 (함수로 호출할 경우) 또는 요소 (배열 리터럴의 경우)로 확장하여, 0개 이상의 키-값의 쌍으로 객체로 확장시킬 수 있음.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  //
  // res.status(200).json([...db.values()]); // 배열

  db.size
    ? res.status(200).json([...db.values()])
    : res.status(404).json({ message: '조회할 유튜버가 없습니다.' });
});

// GET /youtubers/:id
app.get('/youtubers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // Map.has() : 주어진 키에 해당하는 요소가 존재 여부를 가리키는 불리언 값을 반환
  db.has(id)
    ? res.status(200).json({ ...db.get(id) })
    : res.status(404).json({
        message: '찾을 수 없는 유튜버 입니다.',
      });
});

// POST /youtubers
app.post('/youtubers', (req, res) => {
  const { channelTitle, sub, videoNum } = req.body;
  const youtuber = {
    id: Date.now(), // 전역 변수 id를 만들어서 증가시키는 방법도 있음
    channelTitle,
    sub,
    videoNum,
  };
  db.set(youtuber.id, youtuber);
  res.status(201).json(youtuber);

  // 예외처리
});

// PUT /youtubers/:id
app.put('/youtubers/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (!db.has(id)) {
    return res.status(404).json({
      message: `요청하신 id ${id}번은 없는 유튜버 입니다.`,
    });
  }
  const youtuber = db.get(id);
  const channelTitle = youtuber.channelTitle;
  const newChannelTitle = req.body.channelTitle;
  // youtuber.channelTitle = newChannelTitle;

  // ❓ MDN 사이트를 보면 정상적인 값 업데이트 방법은 set 사용하라 나와있다.
  // The correct usage for storing data in the Map is through the set(key, value) method.
  db.set(id, { ...db.get(id), channelTitle: newChannelTitle });
  res.status(200).json({
    message: `${channelTitle}님, 채널명이 ${newChannelTitle}로 수정되었습니다.`,
  });
});

// DELETE /youtubers/:id
app.delete('/youtubers/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // 1. if..else 사용
  // if (db.has(id)) {
  //   res.json({ message: `${channelTitle}님, 정상적으로 삭제 되었습니다.` });
  // } else {
  //   res.json({
  //     message: `요청하신 id ${id}번은 없는 유튜버 입니다.`,
  //   });
  // }

  // 1-2. 삼항 연산자(Conditional (ternary) operator)
  // db.has(id)
  //   ? res.json({ message: `${channelTitle}님, 정상적으로 삭제 되었습니다.` })
  //   : res.json({
  //       message: `요청하신 id ${id}번은 없는 유튜버 입니다.`,
  //     });

  // 2. false인 경우 return해서 종료시키기(?)
  if (!db.has(id)) {
    return res.json({
      message: `요청하신 id ${id}번은 없는 유튜버 입니다.`,
    });
  }

  const channelTitle = db.get(id).channelTitle;
  db.delete(id);
  // 1. message 보내기
  res.json({ message: `${channelTitle}님, 정상적으로 삭제 되었습니다.` });

  // 2. status 204
  // 204 : No Content
  // res.sendStatus(204);
});

// DELETE /youtubers
app.delete('/youtubers', (req, res) => {
  // let message = '';
  // message = db.size
  //   ? '전체 유튜버가 삭제되었습니다.'
  //   : '삭제할 유튜버가 없습니다.';
  // db.clear();
  // res.json({ message });

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE
  if (db.size) {
    db.clear();
    // 정상적으로 삭제되었다는 메세지를 보내야 하기 때문에 200으로 설정
    res.status(200).json({ message: '전체 유튜버가 삭제되었습니다.' });
  } else {
    res.status(404).json({ message: '삭제할 유튜버가 없습니다.' });
  }

  // 204 : No Content
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
