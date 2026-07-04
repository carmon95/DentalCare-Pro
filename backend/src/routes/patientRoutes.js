const express = require('express');

const router = express.Router();

const {
    getPatients,
    createPatient,
    deletePatient,
    deactivatePatient,
    reactivatePatient,
    updatePatient
} = require('../controllers/patientController');

router.get(
    '/',
    getPatients
);

router.post(
    '/',
    createPatient
);

/*
|--------------------------------------------------------------------------
| Desactivar paciente
|--------------------------------------------------------------------------
*/

router.put(
    '/deactivate/:id',
    deactivatePatient
);

/*
|--------------------------------------------------------------------------
| Reactivar paciente
|--------------------------------------------------------------------------
*/

router.put(
    '/reactivate/:id',
    reactivatePatient
);

/*
|--------------------------------------------------------------------------
| Eliminación individual
|--------------------------------------------------------------------------
*/

router.delete(
    '/:id',
    deletePatient
);

router.put(
    '/:id',
    updatePatient
);

module.exports = router;