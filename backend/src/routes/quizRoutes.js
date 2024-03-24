import express from "express";
import {
  saveData,
  getNames,
  getTimesAndScores,
  getQuestionsAnswers,
} from "../controllers/subjects/data.js";

const router = express.Router();

router.post("/save", saveData);

router.get("/names", getNames);

router.get("/times-scores/:name", getTimesAndScores);

router.get("/qa/:name", getQuestionsAnswers);

export default router;
