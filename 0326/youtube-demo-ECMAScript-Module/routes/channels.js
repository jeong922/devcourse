import { Router } from 'express';
const router = Router();

const db = new Map();

// 테스트용 데이터
db.set(1, {
  id: 1,
  userId: 'choonsik',
  channelTitle: '춘식이의첫번째채널',
});
db.set(2, {
  id: 2,
  userId: 'apeach',
  channelTitle: '어피치의첫번째채널',
});

// GET /channels
// router.get('/', (req, res) => {
//   const { userId } = req.body;
//   if (userId) {
//     const channels = [...db.values()].filter((v) => v.userId === userId);
//     channels.length ? res.status(200).json(channels) : notFound(res);
//   } else {
//     notFound(res);
//   }
// });

// GET /channels/:id
// router.get('/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   db.has(id) ? res.status(200).json(db.get(id)) : notFound(res);
// });

// ❓ GET에는 안되는건 아니지만 body를 사용을 권장하지 않는다고함
// GET /channels/:userId -> 사용자 별 채널 조회
// 이렇게 하면 개별 조회도 수정해야함
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  if (db.size && userId) {
    const channels = [...db.values()].filter((v) => v.userId === userId);
    channels.length
      ? res.status(200).json(channels)
      : res.status(404).json({ message: '채널 정보를 찾을 수 없습니다.' });
  } else {
    // 프론트엔드 구현할때 length값에 따라 화면을 구현하기 때문에 그냥 200 보내도 될 것 같긴함...
    res.status(404).json({ message: '채널 정보를 찾을 수 없습니다.' });
  }
});

// GET /channels/:id -> 개별 조회 수정 버전
// id 대신 channelTitle을 유니크하게 만들어서 /:channelTitle 이런식으로 조회하게 만들어도 될 것 같음
router.get('/:userId/:id', (req, res) => {
  let { userId, id } = req.params;
  id = parseInt(id);
  if (db.has(id)) {
    const user = db.get(id);
    userId === user.userId ? res.status(200).json(db.get(id)) : notFound(res);
  } else {
    notFound(res);
  }
});

// POST /channels
router.post('/', (req, res) => {
  // TODO: userId 추가
  const MAX_CHANNEL_LENGTH = 2;
  const bodyLength = Object.keys(req.body).length;
  if (bodyLength === MAX_CHANNEL_LENGTH) {
    const { userId, channelTitle } = req.body;
    const channel = {
      id: Date.now(),
      userId,
      channelTitle,
    };
    db.set(channel.id, channel);
    res.status(201).json({
      message: `${channel.channelTitle} 채널을 응원합니다.`,
    });
  } else {
    res.status(400).json({ message: '정확한 값을 입력해 주세요.' });
  }
});

// PUT /channels/:id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const channelTitle = req.body.channelTitle;

  if (db.has(id)) {
    const oldTitle = db.get(id).channelTitle;
    db.set(id, { ...db.get(id), channelTitle });
    res.status(200).json({
      message: `${oldTitle} 채널명이 ${channelTitle}로 변경되었습니다. `,
    });
  } else {
    notFound(res);
  }
});

// DELETE /channels/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (db.has(id)) {
    const channelTitle = db.get(id).channelTitle;
    db.delete(id);
    res.status(200).json({
      message: `${channelTitle} 채널이 정상적으로 삭제 되었습니다.`,
    });
  } else {
    notFound(res);
  }
});

// Default parameters
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_param
// message 값을 따로 전달하지 않으면 '채널 정보를 찾을 수 없습니다.'로 message가 출력되도록 매개변수 기본값 설정
// 이렇게 하면 message를 원하는 값으로 변경하면서 보낼 수 있음
function notFound(res, message = '채널 정보를 찾을 수 없습니다.') {
  // res 값을 매개변수로 주지 않으면 오류난다.
  res.status(404).json({ message });
}

export default router;
