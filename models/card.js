const mongoose = require('mongoose');
const { REG_EXP_LINK } = require('../utils/constants');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "Название" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "Название" - 2 символа'],
      maxlength: [30, 'Максимальная длина поля "Название" - 30 символов'],
    },
    link: {
      type: String,
      validate: {
        validator: (v) => REG_EXP_LINK.test(v),
        message: 'Некорректная ссылка',
      },
      required: [true, 'Поле "Ссылка" должно быть заполнено'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
