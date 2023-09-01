const User = require('../models/user');

const {
  NOT_FOUND_CODE_STATUS,
  VALIDATION_CODE_STATUS,
  CREATED_CODE_STATUS,
  DEFAULT_CODE_STATUS,
} = require('../utils/constants');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      res.status(NOT_FOUND_CODE_STATUS).send({
        message: 'Пользователь не найден',
      });
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_CODE_STATUS).send({
          message: 'Передан некорректный идентификатор пользователя',
        });
      } else {
        res.status(DEFAULT_CODE_STATUS).send({
          message: 'На сервере произошла ошибка',
        });
      }
      next();
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED_CODE_STATUS).send({
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_CODE_STATUS).send({
          message: 'Переданы некорректные данные пользователя',
        });
      } else {
        res.status(DEFAULT_CODE_STATUS).send({
          message: 'На сервере произошла ошибка',
        });
      }
      next();
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      res.status(NOT_FOUND_CODE_STATUS).send({
        message: 'Пользователь не найден',
      });
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_CODE_STATUS).send({
          message: 'Переданы некорректные данные пользователя',
        });
      } else {
        res.status(DEFAULT_CODE_STATUS).send({
          message: 'На сервере произошла ошибка',
        });
      }
      next();
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      res.status(NOT_FOUND_CODE_STATUS).send({
        message: 'Пользователь не найден',
      });
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_CODE_STATUS).send({
          message: 'Переданы некорректные данные пользователя',
        });
      }
      res.status(DEFAULT_CODE_STATUS).send({
        message: 'На сервере произошла ошибка',
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
