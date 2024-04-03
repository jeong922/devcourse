const express = require('express');
const morgan = require('morgan');
const app = express();
const userRouter = require('./routes/users');
const channelRouter = require('./routes/channels');
const { config } = require('./config');

app.use(express.json());
app.use(morgan('tiny'));

app.use('/', userRouter);
app.use('/channels', channelRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(config.host.port);
