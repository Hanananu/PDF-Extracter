import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from "morgan"
import connectDB from './config/dbConfig.js';
import * as dotenv  from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import pdfRoutes from './routes/pdfRoutes.js';

dotenv.config()

const app = express();

connectDB()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined'))


// Routes

app.use('/api/user', userRoutes);
app.use('/api/pdf', pdfRoutes);

export default app;
