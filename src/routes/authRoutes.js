const express = require('express');
const router = express.Router();
const { register, login, forgetPassword, checkResetToken , enterNewPassword } = require('../controllers/authController');

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Forget password route
router.post('/forgetpassword', forgetPassword);

// Reset token route
router.post('/reset', checkResetToken);
  
// New password route
router.post('/newpassword', enterNewPassword);

module.exports = router;



