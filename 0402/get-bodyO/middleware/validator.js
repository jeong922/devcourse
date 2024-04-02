const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ message: err.array()[0].msg });
  }
  return next();
};

module.exports.validate = validate;
