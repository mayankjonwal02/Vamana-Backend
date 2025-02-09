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

    res.status(201).json({ message: 'Category created successfully', executed: true, category: newCategory });
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Questions.find({});
    res.status(200).json({ executed: true, questions , message : "Questions fetched successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
}
// Add a question to a category by category UID
const createQuestionByCategoryUID = async (req, res) => {
  try {
    const { categoryUID } = req.params;
    const { question,input_type, options } = req.body;

    const category = await Questions.findById(categoryUID);

    if (!category) {
      return res.status(404).json({ message: 'Category not found', executed: false });
    }

    category.questions.push({ question, input_type, options });
    await category.save();

    res.status(200).json({ message: 'Question added successfully', executed: true, category });
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};

// Get questions by category UID
const getQuestionsByCategoryUID = async (req, res) => {
  try {
    const { categoryUID } = req.params;

    const category = await Questions.findById(categoryUID);

    if (!category) {
      return res.status(404).json({ message: 'Category not found', executed: false });
    }

    res.status(200).json({ executed: true, category });
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};

// Update category by UID
const updateCategoryByUID = async (req, res) => {
    console.log(req.body);
  try {
    
    const { categoryUID } = req.params;
    const { category } = req.body;

    const updatedCategory = await Questions.findByIdAndUpdate(categoryUID, { category }, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found', executed: false });
    }

    res.status(200).json({ message: 'Category updated successfully', executed: true, category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};

// Update question by category UID and question UID
const updateQuestionByCategoryUIDAndQuestionUID = async (req, res) => {
  try {
    const { categoryUID, questionUID } = req.params;
    const { question, options,input_type } = req.body;

    const category = await Questions.findById(categoryUID);

    if (!category) {
      return res.status(200).json({ message: 'Category not found', executed: false });
    }

    const questionIndex = category.questions.findIndex((q) => q._id.toString() === questionUID);

    if (questionIndex === -1) {
      return res.status(404).json({ message: 'Question not found', executed: false });
    }


    category.questions[questionIndex].question = question;
    category.questions[questionIndex].options = options;
    category.questions[questionIndex].input_type = input_type;
    await category.save();

    res.status(200).json({ message: 'Question updated successfully', executed: true, category });
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};

// Delete category by UID
const deleteCategoryByUID = async (req, res) => {
  try {
    const { categoryUID } = req.params;

    const deletedCategory = await Questions.findByIdAndDelete(categoryUID);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found', executed: false });
    }

    res.status(200).json({ message: 'Category deleted successfully', executed: true });
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};

// Delete question by category UID and question UID
const deleteQuestionByCategoryUIDAndQuestionUID = async (req, res) => {
  try {
    const { categoryUID, questionUID } = req.params;

    const category = await Questions.findById(categoryUID);

    if (!category) {
      return res.status(404).json({ message: 'Category not found', executed: false });
    }

    const questionIndex = category.questions.findIndex((q) => q._id.toString() === questionUID);

    if (questionIndex === -1) {
      return res.status(404).json({ message: 'Question not found', executed: false });
    }

    category.questions.splice(questionIndex, 1);
    await category.save();

    res.status(200).json({ message: 'Question deleted successfully', executed: true, category });
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};

module.exports = {
  createCategory,
  getAllQuestions,
  createQuestionByCategoryUID,
  getQuestionsByCategoryUID,
  updateCategoryByUID,
  updateQuestionByCategoryUIDAndQuestionUID,
  deleteCategoryByUID,
  deleteQuestionByCategoryUIDAndQuestionUID,
};
