import fs from "fs";
import { PDFDocument } from "pdf-lib";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {resolve} from "path"
import {generateUniqueFileName} from "./fileUtils.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readLocalPdf = async (filePath, pages) => {
  if (fs.existsSync(filePath)) {
    try {
      const pdfBytes = fs.readFileSync(filePath);
      let extractedPdf;

      if (Array.isArray(pages)) {
        if (pages.length === 0) {
          throw new Error("At least select a page to extract new pdf");
        }

        const pdfDoc = await PDFDocument.load(pdfBytes);
        const extractedDoc = await PDFDocument.create();

        for (const pageNumber of pages) {
          if (pageNumber >= 1 && pageNumber <= pdfDoc.getPageCount()) {
            const [copiedPage] = await extractedDoc.copyPages(pdfDoc, [
              pageNumber - 1,
            ]);
            extractedDoc.addPage(copiedPage);
          }
        }

        extractedPdf = await extractedDoc.save();
        const tempFilePath = resolve(
          __dirname,
          "../../../api",
          "public",
          "uploads",
          generateUniqueFileName("pdf")
        );
        
        fs.writeFileSync(tempFilePath, extractedPdf);

        const fileStream = fs.createReadStream(tempFilePath);

        // fs.unlinkSync(filePath);

        return fileStream;
      }
    } catch (error) {
      console.error("Error reading local PDF:", error.message);
      throw new Error("Failed to read local PDF");
    }
  } else {
    throw new Error("PDF file does not exist at the specified path");
  }
};

const extractAndCreatePdf = async (pdfPath, selectedPages) => {
  try {
    const pdfBuffer = await readLocalPdf(pdfPath, selectedPages);
    return pdfBuffer;
  } catch (error) {
    console.error("Error during PDF extraction and creation:", error.message);
    throw new Error("PDF extraction and creation failed");
  }
};

export { extractAndCreatePdf };
