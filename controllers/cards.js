const Card = require('../models/card');

const {
  NOT_FOUND_CODE_STATUS,
  VALIDATION_CODE_STATUS,
  CREATED_CODE_STATUS,
  DEFAULT_CODE_STATUS,
} = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(CREATED_CODE_STATUS).send({
      data: card,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_CODE_STATUS).send({
          message: 'Переданы некорректные данные карточки',
        });
      } else {
        res.status(DEFAULT_CODE_STATUS).send({
          message: 'На сервере произошла ошибка',
        });
      }
      next();
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      res.status(NOT_FOUND_CODE_STATUS).send({
        message: 'Карточка не найдена',
      });
    })
    .then((card) => {
      Card.deleteOne({ _id: card._id }).then(() => {
        res.send({ card });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_CODE_STATUS).send({
          message: 'Передан некорректный идентификатор карточки',
        });
      } else {
        res.status(DEFAULT_CODE_STATUS).send({
          message: 'На сервере произошла ошибка',
        });
      }
      next();
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      res.status(NOT_FOUND_CODE_STATUS).send({
        message: 'Карточка не найдена',
      });
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_CODE_STATUS).send({
          message: 'Переданы некорректные данные карточки',
        });
      } else {
        res.status(DEFAULT_CODE_STATUS).send({
          message: 'На сервере произошла ошибка',
        });
      }
      next();
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      res.status(NOT_FOUND_CODE_STATUS).send({
        message: 'Карточка не найдена',
      });
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_CODE_STATUS).send({
          message: 'Переданы некорректные данные карточки',
        });
      } else {
        res.status(DEFAULT_CODE_STATUS).send({
          message: 'На сервере произошла ошибка',
        });
      }
      next();
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
