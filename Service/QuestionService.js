// Controllers/questionsController.js

const Questions = require('../Models/Questions');

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const newCategory = new Questions({
      category,
      questions: [],
    });

    await newCategory.save();

    res.status(201).json({ message: 'Category created successfully', executes: true, category: newCategory });
  } catch (error) {
    res.status(500).json({ message: error.message, executes: false });
  }
};

// Add a question to a category by category UID
const createQuestionByCategoryUID = async (req, res) => {
  try {
    const { categoryUID } = req.params;
    const { question, options } = req.body;

    const category = await Questions.findById(categoryUID);

    if (!category) {
      return res.status(404).json({ message: 'Category not found', executes: false });
    }

    category.questions.push({ question, options });
    await category.save();

    res.status(200).json({ message: 'Question added successfully', executes: true, category });
  } catch (error) {
    res.status(500).json({ message: error.message, executes: false });
  }
};

// Get questions by category UID
const getQuestionsByCategoryUID = async (req, res) => {
  try {
    const { categoryUID } = req.params;

    const category = await Questions.findById(categoryUID);

    if (!category) {
      return res.status(404).json({ message: 'Category not found', executes: false });
    }

    res.status(200).json({ executes: true, category });
  } catch (error) {
    res.status(500).json({ message: error.message, executes: false });
  }
};

// Update category by UID
const updateCategoryByUID = async (req, res) => {
  try {
    const { categoryUID } = req.params;
    const { category } = req.body;

    const updatedCategory = await Questions.findByIdAndUpdate(categoryUID, { category }, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found', executes: false });
    }

    res.status(200).json({ message: 'Category updated successfully', executes: true, category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message, executes: false });
  }
};

// Update question by category UID and question UID
const updateQuestionByCategoryUIDAndQuestionUID = async (req, res) => {
  try {
    const { categoryUID, questionUID } = req.params;
    const { question, options } = req.body;

    const category = await Questions.findById(categoryUID);

    if (!category) {
      return res.status(404).json({ message: 'Category not found', executes: false });
    }

    const questionIndex = category.questions.findIndex((q) => q._id.toString() === questionUID);

    if (questionIndex === -1) {
      return res.status(404).json({ message: 'Question not found', executes: false });
    }

    category.questions[questionIndex] = { question, options };
    await category.save();

    res.status(200).json({ message: 'Question updated successfully', executes: true, category });
  } catch (error) {
    res.status(500).json({ message: error.message, executes: false });
  }
};

// Delete category by UID
const deleteCategoryByUID = async (req, res) => {
  try {
    const { categoryUID } = req.params;

    const deletedCategory = await Questions.findByIdAndDelete(categoryUID);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found', executes: false });
    }

    res.status(200).json({ message: 'Category deleted successfully', executes: true });
  } catch (error) {
    res.status(500).json({ message: error.message, executes: false });
  }
};

// Delete question by category UID and question UID
const deleteQuestionByCategoryUIDAndQuestionUID = async (req, res) => {
  try {
    const { categoryUID, questionUID } = req.params;

    const category = await Questions.findById(categoryUID);

    if (!category) {
      return res.status(404).json({ message: 'Category not found', executes: false });
    }

    const questionIndex = category.questions.findIndex((q) => q._id.toString() === questionUID);

    if (questionIndex === -1) {
      return res.status(404).json({ message: 'Question not found', executes: false });
    }

    category.questions.splice(questionIndex, 1);
    await category.save();

    res.status(200).json({ message: 'Question deleted successfully', executes: true, category });
  } catch (error) {
    res.status(500).json({ message: error.message, executes: false });
  }
};

module.exports = {
  createCategory,
  createQuestionByCategoryUID,
  getQuestionsByCategoryUID,
  updateCategoryByUID,
  updateQuestionByCategoryUIDAndQuestionUID,
  deleteCategoryByUID,
  deleteQuestionByCategoryUIDAndQuestionUID,
};
