const express = require('express');
const {
  createPatient,
  getAllPatients,
  getPatientByUHID,
  updatePatientDetailsByUHID,
  updatePatientQuestionsByUHID,
  deletePatient,
} = require('../Service/PatientService');

const router = express.Router();

// Routes
router.post('/patients', createPatient);
router.get('/patients', getAllPatients);
router.get('/patients/:uhid', getPatientByUHID);
router.put('/patients/:uhid', updatePatientDetailsByUHID);
router.put('/patients/:uhid/questions', updatePatientQuestionsByUHID);
router.delete('/patients/:uhid', deletePatient);

module.exports = router;
