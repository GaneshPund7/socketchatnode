const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'qwertyuiopasdfghjklzxcvbnm';
const JWT_SECRET = process.env.JWT_SECRET 
exports.generateToken = (payload) => jwt.sign(payload, SECRET_KEY, {
  algorithm: 'HS256',
  expiresIn: 60 * 60 * 24,
});

exports.verifyToken = (token) => jwt.verify(token, JWT_SECRET);