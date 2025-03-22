const express = require('express');
const router = express.Router();
const PaymentController = require('../controller/paymentController');

const paymentController = new PaymentController();

router.post('/validateCard', paymentController.checkCardInfo.bind(paymentController));

module.exports = router;