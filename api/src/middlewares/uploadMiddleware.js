import multer from "multer"
import { resolve } from 'path';
import { generateUniqueFileName } from "../utils/fileUtils.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, resolve(__dirname, '../../../public', 'uploads'));
    },
    filename: function (req, file, cb) {
      const destFileName = generateUniqueFileName("pdf");
      cb(null, destFileName);
    }
  });
  
  const upload = multer({ storage: storage });

  export default upload