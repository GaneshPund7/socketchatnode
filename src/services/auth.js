require("dotenv").config();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const db = require("../models");
const {} = require("../../utils/customError");

exports.userLogin = async (email, password) => {
  console.log(email, password)
  const user = await db.user.findOne({ email });
  if (!user) {
    throw new NotFoundError(`User not found with Email ${email}`);
  }

  const verifyPassword = await user.comparePassword(password);
  if (!verifyPassword) {
    throw new ValidationError("Invalid Password!");
  }

  const token = createToken(
    user._id,
    user.firstName || user.lastName || "thename"
  );

  const userToken = await db.userToken.findOneAndUpdate(
    { userId: user._id },
    { token },
    { new: true, upsert: true }
  );

  const userInfoAndToken = {
    userId: user._id,
    token: userToken.token,
    userName: user.firstName
  };

  return {
    message: "User logged in successfully", 
    userInfoAndToken, 
  };
};

exports.userLogout = async (userId,token) => {
  const result = await db.userToken.deleteOne({ token });

  if (result.deletedCount) {
    redisClient.connected && redisClient.del(`userToken_${token}`);
    redisClient.connected && redisClient.del(`user_${userId}`);
    redisClient.connected && redisClient.del(`user_permission_${userId}`);
    return handleSuccess("User logged out successfully");
  }
};

const createToken = (userId, name) => {
  return jwt.sign({ userId, name }, process.env.JWT_SECRET || "secreatKey", {
    expiresIn: process.env.EXPIRES_IN || "24h",
  });
};

exports.googleSignIn = async (token) => {
  
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;
    let user = await db.user.findOne({ email });

    if (!user) {
      user = await db.user.create({
        name: name,
        email: email,
        avatarUrl: picture,
        status: 'active',
      });
    }
    const loginToken = createToken(user.id, user.name);

    return {
      message: 'Login successful via Google',
      user: { 
        id: user.id,
        email: user.email, 
        name: user.name,
        avatarUrl: user.avatarUrl 
      },
      token: loginToken,
    }
  };
  
