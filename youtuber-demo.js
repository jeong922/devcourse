const express = require("express");
const app = express();

app.use(express.json());

const db = new Map();

const youtubers = [
  {
    id: 1,
    channelTitle: "T1Keria",
    sub: "28.3만명",
    videoNum: "95개",
  },
  {
    id: 2,
    channelTitle: "SKTT1",
    sub: "126만명",
    videoNum: "2.9천개",
  },
  {
    id: 3,
    channelTitle: "T1_Faker",
    sub: "185만명",
    videoNum: "1.3천개",
  },
];

youtubers.forEach((v, i) => db.set(i + 1, v)); // 요구사항이 Map을 사용해야 하는 것 같은데 반복해서 set 하기 귀찮아서 걍 forEach 돌림

// GET /youtubers
app.get("/youtubers", (req, res) => {
  res.status(200).json([...db.values()]);
});

// GET /youtubers:id
app.get("/youtubers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // Map.has() : 주어진 키에 해당하는 요소가 존재 여부를 가리키는 불리언 값을 반환
  db.has(id)
    ? res.status(200).json({ ...db.get(id) })
    : res.status(404).json({
        message: "찾을 수 없는 유튜버 입니다.",
      });
});

// POST /youtubers
app.post("/youtubers", (req, res) => {
  const { channelTitle, sub, videoNum } = req.body;
  // console.log(req.body);
  const youtuber = {
    id: Date.now(), // 전역 변수 id를 만들어서 증가시키는 방법도 있음
    channelTitle,
    sub,
    videoNum,
  };
  db.set(youtuber.id, youtuber);
  // console.log(db);
  res.status(201).json(youtuber);
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
