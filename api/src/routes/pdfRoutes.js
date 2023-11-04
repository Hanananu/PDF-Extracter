import { Router } from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import pdfController from  '../controllers/pdfController.js';

const router =Router();

router.post('/upload', upload.single('pdf'),pdfController.uploadPDF);
router.get('/get/:fileName',pdfController.getPDF);
router.post('/extract',pdfController.extractPages);

export default router