const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY = 'secret' } = process.env;
const UnauthorizedError = require('../errors/unauthorized-error');

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError('Неверный логин и/или пароль'));
    return;
  }

  req.user = payload;

  next();
}

module.exports = { auth };
