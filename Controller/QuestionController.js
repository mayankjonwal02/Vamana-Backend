const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllQuestions,
  createQuestionByCategoryUID,
  getQuestionsByCategoryUID,
  updateCategoryByUID,
  updateQuestionByCategoryUIDAndQuestionUID,
  deleteCategoryByUID,
  deleteQuestionByCategoryUIDAndQuestionUID
} = require('../Service/QuestionService');

// Routes for Categories and Questions

// Create a new category
router.post('/categories', createCategory);

// Get all questions
router.get('/questions', getAllQuestions);

// Add a question to a category by category UID
router.post('/categories/:categoryUID/questions', createQuestionByCategoryUID);

// Get questions by category UID
router.get('/categories/:categoryUID/questions', getQuestionsByCategoryUID);

// Update category by UID
router.put('/categories/:categoryUID', updateCategoryByUID);

// Update question by category UID and question UID
router.put('/categories/:categoryUID/questions/:questionUID', updateQuestionByCategoryUIDAndQuestionUID);

// Delete category by UID
router.delete('/categories/:categoryUID', deleteCategoryByUID);

// Delete question by category UID and question UID
router.delete('/categories/:categoryUID/questions/:questionUID', deleteQuestionByCategoryUIDAndQuestionUID);

module.exports = router;
