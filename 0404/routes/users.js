const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const userController = require('../controller/users');

const router = express.Router();

const validateEmail = [
  body('email')
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage('유효하지 않은 이메일 입니다.'),
  validate,
];

// isStrongPassword라는게 있긴하던데 그냥 최소 길이만 설정함
// trim을 사용 안하면 " aa " 이런거 넣어도 걸러지지지 않음 -> 그래서 공백을 제거해야 함
// trim을 사용해서 그런지 password를 숫자로 입력해도 정상적으로 문자열로 들어감.
const validateEmailAndPassword = [
  body('password')
    .notEmpty()
    .trim()
    .isLength({ min: 4 })
    .withMessage('비밀번호는 4글자 이상 입력해야 합니다.'),
  ...validateEmail,
];

const validateJoin = [
  body('name')
    .notEmpty()
    .trim()
    .isLength({ min: 2 })
    .withMessage('이름을 두글자 이상 입력해주세요.'),
  body('contact').trim(),
  ...validateEmailAndPassword,
];

router.get('/users', validateEmail, userController.getUser);

router.post('/join', validateJoin, userController.join);

router.post('/login', validateEmailAndPassword, userController.login);

router.delete('/users', validateEmail, userController.removeUser);

module.exports = router;
