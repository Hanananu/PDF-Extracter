import { Router } from 'express';
import upload from '../middlewares/uploadMiddleware';
import pdfController from  '../controllers/pdfController';

const router =Router();

router.post('/upload', upload.single('pdf'),pdfController.uploadPDF);
// router.get('/get/:fileName', getPDF);
// router.post('/extract', extractPages);

export default router