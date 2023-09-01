const Card = require('../models/card');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({
      data: card,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные карточки',
        });
      } else {
        res.status(500).send({
          message: 'На сервере произошла ошибка',
        });
      }
      next();
    });
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .orFail(() => {
      res.status(404).send({
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
        res.status(400).send({
          message: 'Передан некорректный идентификатор карточки',
        });
      } else {
        res.status(500).send({
          message: 'На сервере произошла ошибка',
        });
      }
      next();
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
