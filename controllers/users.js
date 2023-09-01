const User = require('../models/user');

function getUsers(req, res, next) {
  // eslint-disable-next-line no-console
  console.log(req);
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
}

function getUserById(req, res, next) {
  User.findById(req.params.userId)
    .orFail(() => {
      res.status(404).send({
        message: 'Пользователь не найден',
      });
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Передан некорректный идентификатор пользователя',
        });
      } else {
        res.status(500).send({
          message: 'На сервере произошла ошибка',
        });
      }
      next();
    });
}

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные пользователя',
        });
      } else {
        res.status(500).send({
          message: 'На сервере произошла ошибка',
        });
      }
      next();
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
