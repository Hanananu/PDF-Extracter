import multer from "multer";
import { resolve } from "path";
import { generateUniqueFileName } from "../utils/fileUtils.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resolve(__dirname, "../../../api", "public", "uploads"));
  },
  filename: function (req, file, cb) {
    const destFileName = generateUniqueFileName("pdf");
    cb(null, destFileName);
  },
});

const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname);
  if (ext !== ".pdf") {
    return cb(new Error("File type not supported"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter });

export default upload;
