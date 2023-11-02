import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const generateAuthToken = async (user) => {
  const token = jwt.sign({ _id: user._id.toString() },process.env.SEC_KEY);
  return token;
};

const authenticateJWT = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SEC_KEY);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

export { generateAuthToken, authenticateJWT };
