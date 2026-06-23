const express = require('express');

const router = express.Router();

const {
    getClinicalHistories,
    createClinicalHistory,
    updateClinicalHistory,
    deleteClinicalHistory
} = require(
    '../controllers/clinicalHistoryController'
);

router.get(
    '/',
    getClinicalHistories
);

router.post(
    '/',
    createClinicalHistory
);

router.put(
    '/:id',
    updateClinicalHistory
);

router.delete(
    '/:id',
    deleteClinicalHistory
);

module.exports = router;