import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import cors from "cors";
import morgan from "morgan";
import helmet from "helmet"; // Added Helmet for enhanced security headers
import connectDB from "./config/dbConfig.js";
import * as dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cookieParser());
// app.use(helmet()); // Use Helmet middleware for enhanced security headers
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/pdf", pdfRoutes);


export default app;
