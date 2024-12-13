const Patient = require('../Models/Patients');

// Create Patient with empty questions
const createPatient = async (req, res) => {
  try {
    const { name, uhid, age, occupation, past_illness, address, medicine_history, date_of_admission, date_of_vamana, prakriti } = req.body;

    const existingPatient = await Patient.findOne({ uhid });
    if (existingPatient) {
      return res.status(200).json({ message: 'UHID already exists', executed: false });
    }
    const newPatient = new Patient({
      name,
      uhid,
      age,
      occupation,
      past_illness,
      address,
      medicine_history,
      date_of_admission,
      date_of_vamana,
      prakriti,
      questions: [],
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

// Update patient details by UHID
const updatePatientDetailsByUHID = async (req, res) => {
  try {
    const { uhid } = req.params;
    const updates = req.body;

    const updatedPatient = await Patient.findOneAndUpdate({ uhid }, updates, { new: true });

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found', executed: false });
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

    const patient = await Patient.findOne({ uhid });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found', executed: false });
    }



      questions.forEach((newQuestion) => {
        const existingQuestionIndex = patient.questions.findIndex((q) => q.question_uid === newQuestion.question_uid);

        if (existingQuestionIndex !== -1) {
          // Update existing question answers
          patient.questions[existingQuestionIndex].answers = newQuestion.answers;
        } else {
          // Add new question
          patient.questions.push({
            question_uid: newQuestion.question_uid,
            question: newQuestion.question,
            answers: newQuestion.answers,
            category,
          });
        }
      });
    

    await patient.save();

    res.status(200).json({ message: 'Questions updated successfully', executed: true, questions: patient.questions });
  } catch (error) {
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
};
