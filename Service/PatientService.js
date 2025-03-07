const Patient = require('../Models/Patients');
const Question = require('../Models/Questions');
const moment = require('moment');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');
// Create Patient with empty questions
const createPatient = async (req, res) => {
  try {
    const { name, uhid, age, occupation, past_illness, address, medicine_history, date_of_admission, date_of_vamana, prakriti ,instituteID } = req.body;
    console.log(req.body);
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
    console.log("called");
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
    const { questions } = req.body;

    // Filter out questions that have empty answers arrays or arrays with empty strings
    const filteredQuestions = questions.filter(
      (q) => Array.isArray(q.answers) && q.answers.length > 0 && q.answers.some(answer => answer.trim() !== '')
    );

    const patient = await Patient.findOne({ uhid });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found', executed: false });
    }

    console.log(filteredQuestions);

    // filteredQuestions.forEach((newQuestion) => {
    //   // Clean the answers array by removing empty strings
    //   const cleanedAnswers = newQuestion.answers.filter(
    //     (answer) => answer.trim() !== ''
    //   );

    //   const existingQuestionIndex = patient.questions.findIndex(
    //     (q) => q.question_uid === newQuestion.question_uid
    //   );

    //   if (existingQuestionIndex !== -1) {
    //     // Update existing question answers
    //     patient.questions[existingQuestionIndex].answers = cleanedAnswers;
    //   } else {
    //     // Add new question with cleaned answers
    //     patient.questions.push({ ...newQuestion, answers: cleanedAnswers });
    //   }
    // });
    // patient.questions = filteredQuestions;

    filteredQuestions.forEach((newQuestion) => {
      const existingQuestionIndex = patient.questions.findIndex(
        (q) => q.question_uid === newQuestion.question_uid
      );

      if (existingQuestionIndex !== -1) {
        // Update existing question answers
        try {
        patient.questions[existingQuestionIndex].answers = newQuestion.answers;
        } catch (error) {
          console.log("error updating:"+error);
          console.log(newQuestion);
        }
      } else {
        // Add new question with cleaned answers
        try {
        patient.questions.push({ ...newQuestion });
        } catch (error) {
          console.log("error adding:"+error);
          console.log(newQuestion);
        }
      }
    });
    try {
      await patient.save();
    } catch (error) {
      console.log("error saving:"+error);
      // console.log(patient);
    }
    // await patient.save();

    res.status(200).json({
      message: 'Questions updated successfully',
      executed: true,
      questions: patient.questions,
    });
  } catch (error) {
    console.error(error);
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


const getPatientsquestiondataByInstituteID = async (req, res) => {
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

const exportPatientsByInstituteID = async (req, res) =>  {
  try {
    const { instituteID } = req.params;

    // Step 1: Create a dictionary of question IDs to question texts
    const questions = await Question.find();
    const questionMap = {};
    questions.forEach(q => {
      q.questions.forEach(subQ => {
        questionMap[subQ._id.toString()] = subQ.question;
      });
    });

    // Step 2: Fetch patients based on instituteID
    const patients = await Patient.find({ instituteID });

    // Step 3: Define CSV headers
    const csvHeaders = [
      { id: 'name', title: 'Name' },
      { id: 'uhid', title: 'UHID' },
      { id: 'age', title: 'Age' },
      // Add other patient fields as needed
      ...Object.values(questionMap).map(question => ({ id: question, title: question })),
    ];

    // Step 4: Prepare CSV data
    const csvData = patients.map(patient => {
      const rowData = {
        name: patient.name,
        uhid: patient.uhid,
        age: patient.age,
        // Add other patient fields as needed
      };

      patient.questions.forEach(pq => {
        const questionText = questionMap[pq.question_uid.toString()];
        if (questionText) {
          rowData[questionText] = pq.answers.join(' - ');
        }
      });

      return rowData;
    });

    // Create a unique filename for the CSV
    const csvFilename = `patients_${instituteID}_${Date.now()}.csv`;
    const csvFilePath = path.join(__dirname, csvFilename);

    // Create CSV writer
    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: csvHeaders,
    });

    // Write CSV file
    await csvWriter.writeRecords(csvData);

    // Send CSV file as response
    res.download(csvFilePath, csvFilename, err => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error generating CSV file.');
      } else {
        // Delete the file after sending it to the client
        fs.unlink(csvFilePath, err => {
          if (err) {
            console.error('Error deleting file:', err);
          }
        });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server Error');
  }
}


module.exports = {
  createPatient,
  getAllPatients,
  getPatientByUHID,
  updatePatientDetailsByUHID,
  updatePatientQuestionsByUHID,
  deletePatient,
  getPatientsByInstituteID,
  exportPatientsByInstituteID,
};
