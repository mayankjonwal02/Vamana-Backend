const mongoose = require('mongoose');


const ResultSchema = new mongoose.Schema({
    antiki_shuddhi : [{ type: String }],
    vaigiki_shuddhi : [{ type: String }],
    laingiki_shuddhi : [{ type: String }],
    maniki_shuddhi : [{ type: String }],
});


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
    instituteID : { type: String },
    prakriti: { type: String },
    InvestigationReport : {     
        filename: { type: String, required: true },
        fileType: { type: String, required: true },
        fileData: { type: String, required: true }, // Base64-encoded PDF
        },
    questions: [{
        question_uid: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
        question: { type: String, required: true },
        answers: [{ type: String, required: true }], // Array of strings
    }],
    Analysis : [{
        question_uid: { type: mongoose.Schema.Types.ObjectId, ref: 'AnalysisQuestion', required: true },
        question: { type: String, required: true },
        answers: [{ type: String, required: true }], // Array of strings
    }],
    SnehaPana : [{
        day : { type: Number, required: true },
        dose : {type: Number, required: true},
        digestivehours : {type: Number, required: true},
    }],
    // result is a single entity
    results: ResultSchema

    
}, { timestamps: true });


module.exports = mongoose.model('Patient', patientSchema);
