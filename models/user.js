const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "Имя" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "Имя" - 2'],
      maxlength: [30, 'Максимальная длина поля "Имя" - 30'],
    },
    about: {
      type: String,
      required: [true, 'Поле "Обо мне" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "Обо мне" - 2'],
      maxlength: [30, 'Максимальная длина поля "Обо мне" - 30'],
    },
    avatar: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректная ссылка',
      },
      required: [true, 'Поле "Аватар" должно быть заполнено'],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);
