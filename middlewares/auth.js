const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const {
  SECRET_KEY,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError('Неверный логин и/или пароль');
  }
  req.user = payload;
  next();
};
