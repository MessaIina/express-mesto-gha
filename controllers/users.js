const User = require('../models/user');

function getUsers(req, res) {
  try {
    const users = User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

function getUserById(req, res) {
  res.json(res.user);
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  const user = new User({ name, about, avatar });
  try {
    const newUser = user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
