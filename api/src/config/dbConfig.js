import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;