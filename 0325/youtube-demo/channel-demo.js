const express = require('express');

const app = express();

app.use(express.json());

const db = new Map();

// 테스트용 데이터
db.set(1, { id: 1, channelTitle: 'choonsik' });

// GET /channels
app.get('/channels', (req, res) => {
  db.size
    ? res.status(200).json([...db.values()])
    : res.status(404).json({ message: '조회할 채널이 없습니다.' });
});

// GET /channels/:id
app.get('/channels/:id', (req, res) => {
  const id = parseInt(req.params.id);

  db.has(id)
    ? res.status(200).json(db.get(id))
    : res.status(404).json({
        message: '존재하지 않는 회원 입니다.',
      });
});

// POST /channels
app.post('/channels', (req, res) => {
  const channelTitle = req.body.channelTitle;

  if (channelTitle) {
    const channel = {
      id: Date.now(),
      channelTitle,
    };
    db.set(channel.id, channel);
    res.status(201).json({
      message: `${channel.channelTitle} 채널을 응원합니다.`,
    });
  } else {
    res.status(400).json({ message: '채널 이름을 입력해 주세요.' });
  }
});

// PUT /channels/:id
app.put('/channels/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const channelTitle = req.body.channelTitle;

  if (db.has(id)) {
    const oldTitle = db.get(id).channelTitle;
    db.set(id, { ...db.get(id), channelTitle });
    res.status(200).json({
      message: `${oldTitle} 채널명이 ${channelTitle}로 변경되었습니다. `,
    });
  } else {
    res.status(404).json({ message: '채널 정보를 찾을 수 없습니다.' });
  }
});

// DELETE /channels/:id
app.delete('/channels/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (db.has(id)) {
    const channelTitle = db.get(id).channelTitle;
    db.delete(id);
    res.status(200).json({
      message: `${channelTitle} 채널이 정상적으로 삭제 되었습니다.`,
    });
  } else {
    res.status(404).json({ message: '채널 정보를 찾을 수 없습니다.' });
  }
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
