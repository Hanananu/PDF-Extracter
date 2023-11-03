import multer from "multer"
import { resolve } from 'path';
import { generateUniqueFileName } from "../utils/fileUtils.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, resolve(__dirname, '../../../api','public', 'uploads'));
    },
    filename: function (req, file, cb) {
      const destFileName = generateUniqueFileName("pdf");
      cb(null, destFileName);
    }
  });
  
  const upload = multer({ storage: storage });

  export default upload