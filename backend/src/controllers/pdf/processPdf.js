import mongoose from "mongoose";
import multer from "multer";
import PdfDetails from "../../models/pdf.js";

// MongoDB connection setup
const mongoUrl =
  "mongodb+srv://REMEZ:REMEZ@cluster01.qrulfpd.mongodb.net/?retryWrites=true&w=majority";

// Function encapsulating file upload and MongoDB operations
const handlePdfUpload = (req, res) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./files");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + file.originalname;
      cb(null, uniqueSuffix);
    },
  });

  const upload = multer({ storage: storage }).single("file");

  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }

    // Save PDF details to MongoDB
    try {
      const { title } = req.body;
      const fileName = req.file.filename;
      await PdfDetails.create({ title, pdf: fileName });
      res.json({
        status: "ok",
        message: "File uploaded and saved to database successfully",
      });
    } catch (error) {
      console.error("Error saving to database:", error);
      res
        .status(500)
        .json({ status: "error", message: "Error saving to database" });
    }
  });
};

export { handlePdfUpload };
