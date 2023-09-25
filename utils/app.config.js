require('dotenv').config();

const {
  JWT_SECRET, NODE_ENV, PORT,
} = process.env;

module.exports = {
  JWT_SECRET, NODE_ENV, PORT,
};
