const express = require('express');

const router = express.Router();
const userController = require('../controllers/users');

router.get('/users', userController.getUsers);

router.get('/users/:userId', userController.getUserById);

router.post('/users', userController.createUser);

module.exports = router;
