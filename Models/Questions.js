const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    category: { type: String, required: true },
    questions: [{
        question: { type: String, required: true },
        options: [{ type: String, required: true }], // Array of strings
    }],
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
