const express = require('express');
const router = express.Router();
const OrderRepository = require('../repository/orderRepository');
const OrderController = require('../controller/orderController');

const orderRepository = new OrderRepository();
const orderController = new OrderController(orderRepository);

router.post('/createOrder', orderController.createOrder.bind(orderController));
router.get('/user/:userId', orderController.getUserOrders.bind(orderController));
router.get('/:orderId', orderController.getOrderById.bind(orderController));

module.exports = router;