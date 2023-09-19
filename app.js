const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const NotFoundError = require('./errors/not-found-error');

const auth = require('./middlewares/auth');

const {
  INTERNAL_SERVER_ERROR,
} = require('./utils/constants');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use(express.json());

mongoose.connect(DB_URL);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Несуществующий маршрут'));
});

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
  });
});

app.listen(PORT);
