const express = require('express');
const {
  createPatient,
  getAllPatients,
  getPatientByUHID,
  getPatientsByInstituteID,
  updatePatientDetailsByUHID,
  updatePatientQuestionsByUHID,
  deletePatient,
  exportPatientsByInstituteID
} = require('../Service/PatientService');

const router = express.Router();

// Routes
router.post('/patients', createPatient);
router.get('/patients', getAllPatients);
router.get('/patients/:uhid', getPatientByUHID);
router.get('/patients/institute/:instituteID', getPatientsByInstituteID);
router.put('/patients/:uhid', updatePatientDetailsByUHID);
router.put('/patients/:uhid/questions', updatePatientQuestionsByUHID);
router.delete('/patients/:uhid', deletePatient);
router.get('/patients/questiondata/:instituteID', exportPatientsByInstituteID);

module.exports = router;
