import User from '../models/userModel';
import { generateAuthToken } from '../middlewares/jwtMiddleware';

const userController ={


 signup:async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      const token = await generateAuthToken(newUser);
      res.json({ token, message: 'User registered successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

 login:async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      const token = await generateAuthToken(user);
      res.json({ token, message: 'Login successful.' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  logout:  async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => token !== req.token);
      await req.user.save();
      res.json({ message: 'Logout successful.' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}




export default userController;
