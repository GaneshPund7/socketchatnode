const { verifyToken } = require('../../utils/jwt');
const db = require('../models');

module.exports = async (req, res, next) => {
  try {
    const checkToken = req.headers.authorization;
    if (!checkToken) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    
    const accessToken = checkToken.split(' ')[1];
    
    const decoded = verifyToken(accessToken);
 
    const user = await db.user.findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
 
    req.userData = {
      id: user._id,
      email: user.email,
      name: user.name
    };

    next();
    
  } catch (err) {
    console.error('Token verification error', err);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};