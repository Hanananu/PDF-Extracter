import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/dbConfig';
// import pdfRoutes from './routes/pdfRoutes';

const app = express();

connectDB()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// app.use('/api/pdf', pdfRoutes);

export default app;
