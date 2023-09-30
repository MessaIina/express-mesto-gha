const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const REG_EXP_LINK = /https?:\/\/(www\.)?[\w\-._~:/?#[\]@!\\$&'()\\*+,;=]+#?/;
const REG_EXP_EMAIL = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

// Массив доменов, с которых разрешены кросс-доменные запросы
const ALOWED_CORS = [
  'https://mesto.msl.nomoredomainsrocks.ru',
];

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  REG_EXP_LINK,
  REG_EXP_EMAIL,
  DEFAULT_ALLOWED_METHODS,
  ALOWED_CORS,
};
