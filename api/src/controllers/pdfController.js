import { generateUniqueFileName } from "../utils/fileUtils";

const pdfController = {
  uploadPDF: (req, res) => {
    try {
      if (!req.file) {
        return res.status(401).json({ error: "A PDF file is required ." });
      }

      const destFileName = generateUniqueFileName("pdf");
      const destFilePath = resolve(
        __dirname,
        "../../../public",
        "uploads",
        destFileName
      );

      console.log("File has been saved to:", destFilePath);

      res.json({
        message: "PDF uploaded successfully",
        fileName: destFileName,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({
        error: error.message || "Internal Server Error",
      });
    }
  },
};
export default pdfController;
