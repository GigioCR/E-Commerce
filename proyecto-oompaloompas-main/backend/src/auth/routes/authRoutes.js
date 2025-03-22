const express = require('express');
const router = express.Router();
const AuthRepository = require('../repository/authRepository'); 
const AuthController = require('../controller/authController');

const authRepository = new AuthRepository();
const authController = new AuthController(authRepository);

router.post('/signup', authController.signup.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/logout', authController.logout.bind(authController));
router.get('/session', authController.getSession.bind(authController));

module.exports = router;

