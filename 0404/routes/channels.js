const express = require('express');
const { body, param } = require('express-validator');
const { validate } = require('../middleware/validator');
const channelController = require('../controller/channels');

const router = express.Router();

const validateUserId = [
  body('userId')
    .notEmpty()
    .isInt()
    .withMessage('userId를 숫자로 입력해주세요.'),
  validate,
];

// ❗ validateUerId이걸 다시 쓰고 싶어서 아래와 같이 작성했는데 validate는 꼭 배열 마지막으로 와야 정상적으로 동작한다.
const validateUserIdAndTitle = [
  body('title')
    .trim()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage('채널명을 한글자 이상 정확하게 입력해주세요.'),
  ...validateUserId,
];

const validateId = [
  param('id')
    .notEmpty()
    .isInt()
    .withMessage('채널 id를 숫자로 정확하게 입력해주세요.'),
  validate,
];

const validateIdAndTitle = [
  body('title')
    .trim()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage('채널명을 한글자 이상 정확하게 입력해주세요.'),
  ...validateId,
];

router.get('/', validateUserId, channelController.getCannels);

router.get('/:id', validateId, channelController.getCannel);

router.post('/', validateUserIdAndTitle, channelController.postChannel);

router.put('/:id', validateIdAndTitle, channelController.putChannel);

router.delete('/:id', validateId, channelController.removeChannel);

module.exports = router;
