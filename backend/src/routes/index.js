import { Router } from "express";
import { handlePdfUpload } from "../controllers/pdf/processPdf.js";
import {
  saveData,
  getNames,
  getTimesAndScores,
  getQuestionsAnswers,
} from "../controllers/subjects/data.js";

const router = Router();

router.post("/upload", handlePdfUpload);
router.post("/savesubject", saveData);
router.get("/getnames", getNames);
router.get("/gettimesscores/:name", getTimesAndScores);
router.get("/getquestionsanswers/:name", getQuestionsAnswers);

export default router;
