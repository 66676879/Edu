const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const compression = require('compression')
const cors = require('cors')

const app = express();


app.use(cors());

app.options('*' , cors());

// Middleware
app.use(express.json());

app.use(compression());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
