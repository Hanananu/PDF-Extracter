import User from "../models/userModel.js";
import { generateAuthToken } from "../middlewares/jwtMiddleware.js";

const userController = {
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if the username or email already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        // Username or email already exists
        return res
          .status(400)
          .json({ message: "Username or email already exists." });
      }

      // If not, create a new user
      const newUser = new User({ username, email, password });
      const response = await newUser.save();

      const token = await generateAuthToken(newUser);
      // Set the token in the browser cookie
      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
        })
        .json({ response, message: "User registered successfully." });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  login: async (req, res) => {

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      const token = await generateAuthToken(user);

      // Set the token in the browser cookie
      return res
        .cookie("token", token, { httpOnly: true, secure: true })
        .json({ user, message: "Login successful." });
    } catch (error) {
      console.log(error);

      // res.status(500).json({ error: "Internal Server Error" });
    }
  },

  profile: async (req, res) => {
    try {
      const user = req?.user
      res.json({ user })
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("token").json({ message: "Logout successful." });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default userController;
