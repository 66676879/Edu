const express = require('express');
const router = express.Router();
const { register, login, forgetPassword } = require('../controllers/authController');

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Forget password route
router.post('/forgetpassword', forgetPassword);

module.exports = router;
