import { Router } from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import pdfController from  '../controllers/pdfController.js';

const router =Router();

router.post('/upload', upload.single('pdf'),pdfController.uploadPDF);
// router.get('/get/:fileName', getPDF);
// router.post('/extract', extractPages);

export default router