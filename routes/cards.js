const express = require('express');

const router = express.Router();

// eslint-disable-next-line import/extensions
const cardController = require('./controllers/cards');

router.get('/cards', cardController.getCards);

router.post('/cards', cardController.createCard);

router.delete('/cards/:cardId', cardController.deleteCard);

module.exports = router;
