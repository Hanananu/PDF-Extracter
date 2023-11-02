import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  tokens: [{ type: String }],
});

const User = mongoose.model('User', userSchema);

export default User;
