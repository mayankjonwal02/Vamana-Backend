// Controllers/questionsController.js

const AnalysisQuestions = require('../Models/Analysis');




// Add a question to a category by category UID
const createQuestion = async (req, res) => {
  try {
    
    const { question, input_type, options } = req.body;

    

    const newQuestion = new AnalysisQuestions({ question, input_type, options });

    const added_question = await newQuestion.save();
    

    res.status(200).json({ message: 'Question added successfully', executed: true, question: added_question });
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};

// Get questions by category UID
const getQuestions = async (req, res) => {
  try {
    

    const questions = await AnalysisQuestions.find({});

    res.status(200).json({ executed: true, questions });
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};



// Update question by category UID and question UID
const updateQuestionByQuestionUID = async (req, res) => {
  try {
    const { questionUID } = req.params;
    const { question,input_type, options } = req.body;

    const old_question = await AnalysisQuestions.findById(questionUID);

    if (!old_question) {
      return res.status(200).json({ message: 'question not found', executed: false });
    }

    old_question.question = question;
    old_question.input_type = input_type;
    old_question.options = options;
    await old_question.save();

    res.status(200).json({ message: 'Question updated successfully', executed: true, category });
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};



// Delete question by category UID and question UID
const deleteQuestionByQuestionUID = async (req, res) => {
  try {
    const {  questionUID } = req.params;

    const old_question = await AnalysisQuestions.findById(questionUID);

    if (!old_question) {
      return res.status(404).json({ message: 'question not found', executed: false });
    }

    await old_question.remove();

    res.status(200).json({ message: 'Question deleted successfully', executed: true, category });
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  updateQuestionByQuestionUID,
  deleteQuestionByQuestionUID,
  
};
