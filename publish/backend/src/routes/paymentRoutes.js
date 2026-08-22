const express = require('express');

const router = express.Router();

const {
    getPayments,
    createPayment,
    updatePayment,
    deletePayment,
    getPaymentSummary
} = require(
    '../controllers/paymentController'
);

router.get(
    '/',
    getPayments
);

router.post(
    '/',
    createPayment
);

router.put(
    '/:id',
    updatePayment
);

router.delete(
    '/:id',
    deletePayment
);

router.get(
    '/summary',
    getPaymentSummary
);

module.exports = router;