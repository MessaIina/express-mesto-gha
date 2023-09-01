const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const {
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('./utils/constants');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use(express.json());

mongoose.connect(DB_URL);

app.use((req, res, next) => {
  req.user = {
    _id: '64f16fcb5a94cd966d90295c',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({
    message: 'Несуществующий маршрут',
  });
});

app.use((err, req, res) => {
  const { statusCode, message } = err;
  if (statusCode === INTERNAL_SERVER_ERROR) {
    return res.send({
      message: 'Внутренняя ошибка сервера',
    });
  }
  return message;
});

app.listen(PORT);
