const channelData = require('../data/channels');

async function getCannels(req, res) {
  const { userId } = req.body;
  const channels = await channelData.getChannelByUserId(userId);

  if (!channels.length) {
    return notFound(res);
  }

  res.status(200).json(channels);
}

async function getCannel(req, res) {
  const id = parseInt(req.params.id);
  const channel = await channelData.getChannelById(id);

  if (!channel) {
    return notFound(res);
  }

  res.status(200).json(channel);
}

async function postChannel(req, res) {
  let { userId, title } = req.body;
  userId = parseInt(userId);

  const channel = await channelData.createChannel(userId, title);

  res.sendStatus(201);
}

async function putChannel(req, res) {
  const id = parseInt(req.params.id);
  const title = req.body.title;
  const update = await channelData.updateChannel(id, title);

  if (!update.affectedRows) {
    return notFound(res);
  }

  res.status(200).json({
    message: `채널명이 ${title}로 변경되었습니다. `,
  });
}

async function removeChannel(req, res) {
  const id = parseInt(req.params.id);
  const remove = await channelData.deleteChannel(id);

  if (!remove.affectedRows) {
    return notFound(res);
  }

  res.status(200).json({ message: '채널이 정상적으로 삭제되었습니다.' });
}

function notFound(res, message = '채널 정보를 찾을 수 없습니다.') {
  res.status(404).json({ message });
}

const channelController = {
  getCannels,
  getCannel,
  postChannel,
  putChannel,
  removeChannel,
};

module.exports = channelController;
