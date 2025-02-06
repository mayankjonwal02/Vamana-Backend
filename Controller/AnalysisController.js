const express = require('express');
const router = express.Router();
const {
  createQuestion,
  getQuestions,
  updateQuestionByQuestionUID,
  deleteQuestionByQuestionUID
} = require('../Service/AnalysisService');

// Routes for Questions

// Create a new question
router.post('/analysisQuestions', createQuestion);

// Get all questions
router.get('/analysisquestions', getQuestions);

// Update question by question UID
router.put('/analysisQuestions/:questionUID', updateQuestionByQuestionUID);

// Delete question by question UID
router.delete('/analysisQuestions/:questionUID', deleteQuestionByQuestionUID);

module.exports = router;
