const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REG_EXP_EMAIL, REG_EXP_LINK } = require('../utils/constants');
const {
  getProfileUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
} = require('../controllers/users');

router.get('/me', getProfileUser);
router.get('/', getUsers);
router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  getUserById,
);
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
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(REG_EXP_LINK),
      email: Joi.string().required().pattern(REG_EXP_EMAIL),
      password: Joi.string().required().min(6),
    }),
  }),
  createUser,
);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(REG_EXP_EMAIL),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);

module.exports = router;
