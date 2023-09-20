const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REG_EXP_LINK } = require('../utils/constants');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getProfileUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getProfileUser);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(REG_EXP_LINK),
    }),
  }),
  updateAvatar,
);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);

module.exports = router;
