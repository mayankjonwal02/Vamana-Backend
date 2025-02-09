// Controllers/questionsController.js

const AnalysisQuestions = require('../Models/Analysis');
const Patient = require('../Models/Patients');



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

    res.status(200).json({ executed: true, questions , message : "Questions fetched successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};



// Update question by category UID and question UID
const updateQuestionByQuestionUID = async (req, res) => {
  try {
    const { questionUID } = req.params;
    const { question,input_type, options } = req.body;

    // console.log(req.body);
    const old_question = await AnalysisQuestions.findById(questionUID);

    if (!old_question) {
      return res.status(200).json({ message: 'question not found', executed: false });
    }

    old_question.question = question;
    old_question.input_type = input_type;
    old_question.options = options;
    await old_question.save();

    res.status(200).json({ message: 'Question updated successfully', executed: true });
  } catch (error) {
    // console.log(error);
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

    await AnalysisQuestions.deleteOne({ _id: questionUID });

    res.status(200).json({ message: 'Question deleted successfully', executed: true });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error.message, executed: false });
  }
};


const getAnalysisStatistics = async function(req, res) {
  try {
      // Step 1: Fetch Analysis Questions with valid input_type
      const validInputTypes = ["radio", "checkbox", "dropdown"];
      const analysisQuestions = await AnalysisQuestions.find({ input_type: { $in: validInputTypes } });

      // Step 2: Count total number of patients
      const totalPatients = await Patient.countDocuments();

      // Step 3: Aggregate patient responses for analysis questions
      const analysisStats = await Patient.aggregate([
          { $unwind: "$Analysis" },  // Flatten the Analysis array
          {
              $match: {
                  "Analysis.question_uid": { $in: analysisQuestions.map(q => q._id) } // Filter by valid questions
              }
          },
          {
              $group: {
                  _id: { question_uid: "$Analysis.question_uid", answer: "$Analysis.answers" },
                  count: { $sum: 1 }
              }
          }
      ]);

      // Step 4: Format the response
      const questions = analysisQuestions.map(question => {
          const optionsCount = {};

          // Initialize all options to 0%
          question.options.forEach(option => {
              optionsCount[option] = 0;
          });

          // Update the count from analysisStats
          analysisStats.forEach(stat => {
              if (stat._id.question_uid.toString() === question._id.toString()) {
                  stat._id.answer.forEach(answer => {
                      if (optionsCount.hasOwnProperty(answer)) {
                          optionsCount[answer] = ((stat.count / totalPatients) * 100).toFixed(2);
                      }
                  });
              }
          });



          return {
              question: question.question,
              options: Object.entries(optionsCount).map(([option, value]) => ({ option, value: `${value}%` }))
          };
      });

      res.status(200).json({ executed: true, questions, message: "Analysis statistics fetched successfully" });
  } catch (error) {
      console.error("Error fetching analysis statistics:", error);
      throw error;
  }
}

module.exports = {
  createQuestion,
  getQuestions,
  updateQuestionByQuestionUID,
  deleteQuestionByQuestionUID,
  getAnalysisStatistics
};
