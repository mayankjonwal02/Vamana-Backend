const Patient = require('../Models/Patients');
const moment = require('moment');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// Create Patient with empty questions
const createPatient = async (req, res) => {
  try {
    const { name, uhid, age, occupation, past_illness, address, medicine_history, date_of_admission, date_of_vamana, prakriti ,instituteID } = req.body;

    const existingPatient = await Patient.findOne({ uhid });
    if (existingPatient) {
      return res.status(200).json({ message: 'UHID already exists', executed: false });
    }
    const newPatient = new Patient({
      name : name,
      uhid : uhid,
      age : age,
      occupation : occupation,
      past_illness : past_illness,
      address : address,
      medicine_history : medicine_history,
      date_of_admission : moment(date_of_admission, 'DD/MM/YYYY').toDate(),
      date_of_vamana : date_of_vamana ? moment(date_of_vamana, 'DD/MM/YYYY').toDate() : null,
      prakriti : prakriti,
      instituteID : instituteID,
      questions: [],
      Analysis : [],
      results: {
        antiki_shuddhi: [],
        vaigiki_shuddhi: [],
        laingiki_shuddhi: [],
        maniki_shuddhi: []},
    });

    await newPatient.save();

    res.status(201).json({ message: 'Patient created successfully', executed: true, patient: newPatient });
  } catch (error) {
    console.log(error);
    // console.log(error);
    res.status(500).json({ message: error.message, executed: false });
  }
};

// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ executed: true, patients , message : "Patients fetched successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};

// Get patient by UHID
const getPatientByUHID = async (req, res) => {
  try {
    const { uhid } = req.params;
    const patient = await Patient.findOne({ uhid });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found', executed: false });
    }

    res.status(200).json({ executed: true, patient });
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};

const getPatientsByInstituteID = async (req, res) => {
  try {
    const { instituteID } = req.params;
    const patients = await Patient.find({ instituteID });

    if (!patients) {
      return res.status(200).json({ message: 'Patients not found', executed: false });
    }

    res.status(200).json({ executed: true, patients , message : "Patients fetched successfully"});
  } catch (error) {
    res.status(200).json({ message: "Error While Fetching Patients", executed: false });
  }
}

// Update patient details by UHID
const updatePatientDetailsByUHID = async (req, res) => {
  try {
    const { uhid } = req.params;
    const updates = req.body;
    // console.log(updates.questions[0].answers);
    console.log(updates);
    const updatedPatient = await Patient.findOneAndUpdate({ uhid }, updates.update, { new: true });


    if (!updatedPatient) {
      return res.status(200).json({ message: 'Patient not found', executed: false });
    }

    res.status(200).json({ message: 'Patient details updated successfully', executed: true, patient: updatedPatient });
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};

// Update patient questions by UHID
const updatePatientQuestionsByUHID = async (req, res) => {
  try {
    const { uhid } = req.params;
    const {questions } = req.body;
    console.log(questions);
    const patient = await Patient.findOne({ uhid });

    if (!patient) {
      return res.status(200).json({ message: 'Patient not found', executed: false });
    }



      questions.forEach((newQuestion) => {
        const existingQuestionIndex = patient.questions.findIndex((q) => q.question_uid === newQuestion.question_uid);

        if (existingQuestionIndex !== -1) { 
          // Update existing question answers
          patient.questions[existingQuestionIndex].answers = newQuestion.answers;
        } else {
          // Add new question
          patient.questions = questions;
        }
      });
    

    await patient.save();

    res.status(200).json({ message: 'Questions updated successfully', executed: true, questions: patient.questions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, executed: false });
  }
};

// Delete patient by UHID
const deletePatient = async (req, res) => {
  try {

    const { uhid } = req.params;

    const deletedPatient = await Patient.findOneAndDelete({ uhid });

    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found', executed: false });
    }

    res.status(200).json({ message: 'Patient deleted successfully', executed: true });
  } catch (error) {
    res.status(500).json({ message: error.message, executed: false });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientByUHID,
  updatePatientDetailsByUHID,
  updatePatientQuestionsByUHID,
  deletePatient,
  getPatientsByInstituteID
};
