const User = require('../models/user');

const {
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      res.status(NOT_FOUND).send({
        message: 'Пользователь не найден',
      });
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({
          message: 'Передан некорректный идентификатор пользователя',
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'Внутренняя ошибка сервера',
        });
      }
      next();
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED).send({
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные пользователя',
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'Внутренняя ошибка сервера',
        });
      }
      next();
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      res.status(NOT_FOUND).send({
        message: 'Пользователь не найден',
      });
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные пользователя',
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'Внутренняя ошибка сервера',
        });
      }
      next();
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      res.status(NOT_FOUND).send({
        message: 'Пользователь не найден',
      });
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные пользователя',
        });
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Внутренняя ошибка сервера',
      });
      next();
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
