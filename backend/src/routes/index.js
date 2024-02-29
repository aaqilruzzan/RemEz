import { Router } from "express";
import { handlePdfUpload } from "../controllers/pdf/processPdf.js";
import {
  saveData,
  getNames,
  getTimes,
  getQuestions,
} from "../controllers/subjects/data.js";

const router = Router();

router.post("/upload", handlePdfUpload);
router.post("/savesubject", saveData);
router.get("/getnames", getNames);
router.get("/gettimes/:name", getTimes);
router.get("/getquestions/:name", getQuestions);

export default router;
