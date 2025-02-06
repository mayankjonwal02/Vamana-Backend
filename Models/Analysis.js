const mongoose = require('mongoose');

const AnalysisQuestionSchema = new mongoose.Schema({
   
  
        question: { type: String, required: true },
        input_type: { type: String, default: 'text' }, // text, radio, checkbox
        options: [{ type: String, required: true }], // Array of strings

}, { timestamps: true });

module.exports = mongoose.model('AnalysisQuestion', AnalysisQuestionSchema);
