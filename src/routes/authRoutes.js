const express = require('express');
const router = express.Router();
const { register, login, forgetPassword, checkResetToken } = require('../controllers/authController');

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Forget password route
router.post('/forgetpassword', forgetPassword);

// Reset token route
router.post('/reset', checkResetToken);

module.exports = router;
