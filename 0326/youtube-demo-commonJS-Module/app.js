const express = require('express');
const app = express();

const userRouter = require('./routes/users');

const channelRouter = require('./routes/channels');

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
