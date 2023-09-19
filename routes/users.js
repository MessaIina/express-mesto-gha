const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REG_EXP_LINK } = require('../utils/constants');
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
      userId: Joi.string().length().hex(),
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
router.post('/signin', login);
router.post('/signup', createUser);

module.exports = router;
