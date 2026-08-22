const express = require('express');

const router = express.Router();

const {

    getPatientSummary

} = require('../controllers/patientSummaryController');

/*
|--------------------------------------------------------------------------
| Expediente completo del paciente
|--------------------------------------------------------------------------
*/

router.get(

    '/:id',

    getPatientSummary

);

module.exports = router;