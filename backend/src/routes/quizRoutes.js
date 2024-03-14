import express from 'express';
import { saveData, getNames, getTimesAndScores, getQuestionsAnswers } from '../controllers/subjects/data.js'; 

const router = express.Router();

// Route to save quiz data
router.post('/save', saveData);

// Route to get all quiz names
router.get('/names', getNames);

// Route to get times and scores by quiz name
router.get('/times-scores/:name', getTimesAndScores);

// Route to get questions and answers by quiz name
router.get('/qa/:name', getQuestionsAnswers);

export default router;