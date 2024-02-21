import { Router } from "express";
import { handlePdfUpload } from "../controllers/pdf/processPdf.js";

const router = Router();

router.post("/upload", handlePdfUpload);

export default router;
