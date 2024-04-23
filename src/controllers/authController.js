const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { username, email , password } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email, 
      password: hashedPassword
    });

    // Save the user to the database
    //console.log(`${user}`)
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // If user not found or password doesn't match
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (user) {
      // If the user exists, you can choose to send an email with a password reset link here.
      // For simplicity, let's just return a success message for now.
      return res.json({ success: true, message: 'Password reset email sent successfully.' });
    } else {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

module.exports = { register, login, forgetPassword };
