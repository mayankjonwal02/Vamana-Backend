const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    uhid: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    occupation: { type: String },
    past_illness: { type: String },
    address: { type: String },
    medicine_history: { type: String },
    date_of_admission: { type: Date, required: true },
    date_of_vamana: { type: Date },
    prakriti: { type: String },
    questions: [{
        question_uid: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
        question: { type: String, required: true },
        answers: [{ type: String, required: true }], // Array of strings
    }],
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
