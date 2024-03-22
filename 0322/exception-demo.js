// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// find
// The find() method of Array instances returns the first element in the provided array that satisfies the provided testing function.
// If no values satisfy the testing function, undefined is returned.

const express = require('express');
const app = express();

const fruits = [
  { id: 1, name: 'apple', icon: '🍎' },
  { id: 2, name: 'avocado', icon: '🥑' },
  { id: 3, name: 'cherry', icon: '🍒' },
  { id: 4, name: 'peach', icon: '🍑' },
];

// GET /fruits
app.get('/fruits', (req, res) => {
  res.status(200).json(fruits);
});

// GET /fruits/:id
app.get('/fruits/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const findFruits = fruits.find((v) => v.id === id);

  // 1. status(404)
  findFruits
    ? res.status(200).json(findFruits)
    : res.status(404).send(`전달주신 ${id}로 저장된 과일이 없습니다. `);

  // 2. sendStatus(404)
  // findFruits ? res.status(200).json(findFruits) : res.sendStatus(404);
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(3000);
