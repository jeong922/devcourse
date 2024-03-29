const express = require('express');
const app = express();

const userRouter = require('./routes/users');
const { connection } = require('./db-demo');
const { db } = require('./db/database');

app.use('/', userRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

db.getConnection();

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
