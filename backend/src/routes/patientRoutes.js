const express = require('express');

const router = express.Router();

const {
    getPatients,
    createPatient,
    deletePatient,
    updatePatient
} = require('../controllers/patientController');

router.get('/', getPatients);

router.post(
    '/',
    createPatient
);

router.delete('/:id', deletePatient);
router.put(
    '/:id',
    updatePatient
);

module.exports = router;