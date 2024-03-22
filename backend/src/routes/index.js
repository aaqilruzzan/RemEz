import { Router } from "express";
import { handlePdfUpload } from "../controllers/pdf/processPdf.js";
import {
  saveData,
  getNames,
  getTimesAndScores,
  getQuestionsAnswers,
  getData,
  getAllProgressData,
} from "../controllers/subjects/data.js";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controllers/Notes/notesController.js";

import { deleteTopic } from "../controllers/subjects/data.js";
const router = Router();

router.post("/upload", handlePdfUpload);
router.post("/savesubject", saveData);
router.get("/getnames", getNames);
router.get("/gettimesscores/:name", getTimesAndScores);
router.get("/getquestionsanswers/:name", getQuestionsAnswers);
router.post("/notes", createNote);
router.get("/getnotes", getNotes);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);

router.get("/getdata/:name", getData);
router.get("/getallprogressdata", getAllProgressData);
router.delete("/deletetopic/:name", deleteTopic);
export default router;
