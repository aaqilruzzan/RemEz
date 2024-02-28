import { Router } from "express";
import { handlePdfUpload } from "../controllers/pdf/processPdf.js";
import { saveData, getNames, getTimes } from "../controllers/subjects/data.js";

const router = Router();

router.post("/upload", handlePdfUpload);
router.post("/savesubject", saveData);
router.get("/getnames", getNames);
router.get("/gettimes", getTimes);

export default router;
