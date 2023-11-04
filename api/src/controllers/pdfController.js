import { resolve } from "path";
import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { extractAndCreatePdf } from "../utils/pdfCreation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pdfController = {
  uploadPDF: (req, res) => {
    try {
      const { filename } = req.file;
      const fileWithOutExtension = filename.replace(".pdf", "");

      if (!req.file) {
        return res.status(401).json({ error: "A PDF file is required ." });
      }
      res.json({
        message: "PDF uploaded successfully",
        fileWithOutExtension,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({
        error: error.message || "Internal Server Error",
      });
    }
  },

  getPDF: (req, res) => {
    const { fileName } = req.params;
    try {
      // Construct the file path based on the requested filename
      const filePath = resolve(
        __dirname,
        "../../../api",
        "public",
        "uploads",
        fileName
      );

      // Set the appropriate Content-Type header based on the file type
      const contentType = "application/pdf"; // Change this based on your file type
      res.setHeader("Content-Type", contentType);

      // Create a readable stream from the file and pipe it to the response
      const stream = createReadStream(filePath);
      stream.pipe(res);

      stream.on("error", (error) => {
        console.error("Error streaming file:", error);
        res.status(500).end();
      });

      stream.on("end", () => {
        res.end();
      });
    } catch (error) {
      console.error("Error fetching file:", error);
      res.status(500).json({ error: "Failed to fetch file" });
    }
  },

  extractPages: async (req, res) => {
    const { pages, pdfName } = req.body;

    try {
      const filePath = resolve(
        __dirname,
        "../../../api",
        "public",
        "uploads",
        pdfName
      );
      const stream = await extractAndCreatePdf(filePath, pages);

      res.setHeader("Content-Type", "application/pdf");
      stream.pipe(res);

      stream.on("error", (error) => {
        console.error("Error streaming file:", error);
        res.status(500).end();
      });

      stream.on("end", () => {
        res.end();
      });
    } catch (error) {
      console.error("Error during PDF extraction and creation:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default pdfController;
